import { Handler, HandlerEvent } from '@netlify/functions';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// Default password: Denon230770!
const DEFAULT_PASSWORD_HASH = '$2a$10$iWwPb1jzdH354vD8xQmboufPT2zxEbNp.xQsQm3fslCk8a445zs1W';
const DEFAULT_JWT_SECRET = 'laurence-etoubleau-portfolio-jwt-secret-key-2024';

const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
const PASSWORD_HASH = process.env.NETLIFY_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

// In-memory rate limiting store (resets on function cold start)
const rateLimitStore = new Map<string, { attempts: number; resetTime: number }>();

// CORS configuration
const ALLOWED_ORIGINS = [
  'https://lo-portfolio.netlify.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

function getCORSHeaders(origin: string | undefined): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Clean up expired records
  if (record && now > record.resetTime) {
    rateLimitStore.delete(ip);
  }

  const currentRecord = rateLimitStore.get(ip);

  if (!currentRecord) {
    rateLimitStore.set(ip, {
      attempts: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_ATTEMPTS - 1 };
  }

  if (currentRecord.attempts >= RATE_LIMIT_MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  currentRecord.attempts++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_ATTEMPTS - currentRecord.attempts,
  };
}

export const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers.origin;
  const headers = getCORSHeaders(origin);

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Rate limiting based on IP
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
    const rateLimitCheck = checkRateLimit(clientIp);

    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return {
        statusCode: 429,
        headers: {
          ...headers,
          'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
        },
        body: JSON.stringify({
          error: 'Too many login attempts. Please try again later.',
          retryAfter: RATE_LIMIT_WINDOW_MS / 1000,
        }),
      };
    }

    const { password } = JSON.parse(event.body || '{}');

    if (!password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Password is required' }),
      };
    }

    // Compare password with hash
    const isValid = await bcrypt.compare(password, PASSWORD_HASH);

    if (!isValid) {
      console.warn(`Failed login attempt from IP: ${clientIp}`);
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: 'Invalid password',
          remaining: rateLimitCheck.remaining,
        }),
      };
    }

    // Generate JWT token (reduced to 7 days for better security)
    const token = jwt.sign(
      { authenticated: true, timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`Successful login from IP: ${clientIp}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ token, success: true }),
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};


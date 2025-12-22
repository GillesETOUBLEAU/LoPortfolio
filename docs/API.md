# API Documentation

## Authentication Endpoint

### POST /api/auth

Authenticates a user with password and returns a JWT token.

#### Request

**URL:** `/api/auth`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "password": "string"
}
```

**Example:**
```bash
curl -X POST https://your-domain.netlify.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "your-password"}'
```

#### Response

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "success": true
}
```

**Error Responses:**

**400 Bad Request** - Missing password
```json
{
  "error": "Password is required"
}
```

**401 Unauthorized** - Invalid password
```json
{
  "error": "Invalid password",
  "remaining": 4
}
```

**429 Too Many Requests** - Rate limit exceeded
```json
{
  "error": "Too many login attempts. Please try again later.",
  "retryAfter": 900
}
```

**Headers:**
```
Retry-After: 900
```

**500 Internal Server Error** - Server configuration error
```json
{
  "error": "Server configuration error: Missing JWT_SECRET"
}
```

or

```json
{
  "error": "Server configuration error: Missing PASSWORD_HASH"
}
```

or

```json
{
  "error": "Internal server error"
}
```

#### Rate Limiting

- **Window:** 15 minutes (900 seconds)
- **Max Attempts:** 5 per IP address
- **Storage:** In-memory (resets on function cold start)
- **Tracking:** Based on `x-forwarded-for` header

**Rate Limit Response Headers:**
- `Retry-After`: Seconds until rate limit resets (only when limit exceeded)

#### CORS

**Allowed Origins:**
- `https://your-domain.netlify.app` (production)
- `http://localhost:3000` (development)
- `http://localhost:5173` (Vite dev server)

**Allowed Methods:**
- `POST`
- `OPTIONS` (preflight)

**Allowed Headers:**
- `Content-Type`

#### JWT Token

**Payload:**
```json
{
  "authenticated": true,
  "timestamp": 1234567890123,
  "exp": 1234567890,
  "iat": 1234567890
}
```

**Properties:**
- `authenticated`: Always `true`
- `timestamp`: Unix timestamp in milliseconds when token was issued
- `exp`: Expiration time (7 days from issue)
- `iat`: Issued at time

**Expiration:** 7 days

**Algorithm:** HS256 (HMAC with SHA-256)

#### Security Features

1. **Password Hashing:**
   - Algorithm: bcrypt
   - Rounds: 10 (configurable when generating hash)

2. **JWT Signing:**
   - Required environment variable (no default)
   - Strong random string recommended (32+ characters)

3. **Rate Limiting:**
   - IP-based tracking
   - Prevents brute force attacks
   - Automatic cleanup of expired records

4. **CORS Protection:**
   - Whitelist of allowed origins
   - Rejects requests from unknown domains

## Frontend Integration

### Using the Authentication API

```typescript
import { AUTH_TOKEN_KEY } from './constants';

async function login(password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
      return false;
    }

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}
```

### Token Validation

```typescript
function isTokenValid(token: string): boolean {
  try {
    // Decode JWT payload (not verifying signature on frontend)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;

    // Check if token is expired
    if (payload.exp && payload.exp > now) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
```

### Handling Rate Limiting

```typescript
async function loginWithRateLimitHandling(password: string) {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (response.status === 429) {
    const data = await response.json();
    const retryAfter = data.retryAfter || 900;

    alert(`Too many attempts. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`);
    return false;
  }

  // Handle other responses...
}
```

## Environment Configuration

### Required Environment Variables

**NETLIFY_PASSWORD_HASH**
- **Description:** bcrypt hash of the portfolio password
- **Required:** Yes
- **Format:** bcrypt hash string
- **Example:** `$2a$10$abcdefghijklmnopqrstuvwxyz...`
- **Generation:**
  ```bash
  node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(hash => console.log(hash));"
  ```

**JWT_SECRET**
- **Description:** Secret key for signing JWT tokens
- **Required:** Yes (no default for security)
- **Format:** Strong random string
- **Example:** `your-super-secret-jwt-key-minimum-32-characters`
- **Recommendation:** Use a cryptographically secure random string (32+ characters)
- **Generation:**
  ```bash
  openssl rand -base64 32
  ```

### Netlify Configuration

1. Navigate to **Site settings** > **Environment variables**
2. Add both variables
3. Deploy or trigger a rebuild for changes to take effect

## Error Handling

### Client-Side Error Handling

The frontend should handle these scenarios:

1. **Network Errors:**
   - Offline/no connection
   - Timeout
   - DNS resolution failure

2. **Authentication Errors:**
   - Invalid password
   - Missing token in response
   - Expired token

3. **Rate Limiting:**
   - Display retry countdown
   - Disable login form temporarily

### Server-Side Error Logging

The auth function logs:

- Missing environment variables (ERROR level)
- Failed login attempts (WARN level)
- Successful logins (INFO level)
- Rate limit violations (WARN level)
- Unexpected errors (ERROR level)

Example logs:
```
ERROR: JWT_SECRET environment variable is not set
WARN: Failed login attempt from IP: 192.168.1.1
WARN: Rate limit exceeded for IP: 192.168.1.1
INFO: Successful login from IP: 192.168.1.1
ERROR: Auth error: <error details>
```

## Testing the API

### Manual Testing with curl

**Successful Login:**
```bash
curl -X POST http://localhost:8888/api/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "correct-password"}' \
  -v
```

**Invalid Password:**
```bash
curl -X POST http://localhost:8888/api/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "wrong-password"}' \
  -v
```

**Missing Password:**
```bash
curl -X POST http://localhost:8888/api/auth \
  -H "Content-Type: application/json" \
  -d '{}' \
  -v
```

**Rate Limit Testing:**
```bash
# Send 6 requests in quick succession
for i in {1..6}; do
  curl -X POST http://localhost:8888/api/auth \
    -H "Content-Type: application/json" \
    -d '{"password": "wrong"}' \
    -w "\nStatus: %{http_code}\n\n"
done
```

### Testing with Netlify Dev

```bash
# Start Netlify dev server
netlify dev

# API available at http://localhost:8888/api/auth
```

## Best Practices

1. **Always use HTTPS in production**
2. **Rotate JWT_SECRET periodically**
3. **Monitor failed login attempts**
4. **Set up alerting for rate limit violations**
5. **Use strong passwords (12+ characters, mixed case, numbers, symbols)**
6. **Don't log sensitive data (passwords, tokens)**
7. **Implement token refresh if session management is needed**
8. **Consider moving to httpOnly cookies instead of localStorage**

## Limitations

1. **In-Memory Rate Limiting:**
   - Resets on function cold starts
   - Not shared across multiple function instances
   - Consider Redis for production

2. **localStorage Storage:**
   - Vulnerable to XSS attacks
   - Consider httpOnly cookies for better security

3. **No Token Refresh:**
   - Token expires after 7 days
   - User must log in again
   - Consider implementing refresh tokens

4. **Single Password:**
   - All users share the same password
   - No user-specific access control

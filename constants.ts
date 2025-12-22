// Authentication
export const AUTH_TOKEN_KEY = 'portfolio_auth_token';
export const JWT_EXPIRATION_DAYS = 7; // Reduced from 30 days for better security

// Animation & Timing
export const ORBIT_ANIMATION_DURATION = '60s';
export const SCROLL_DEBOUNCE_MS = 100;

// Orbit Diagram
export const ORBIT_RADIUS = 42; // Percentage from center
export const ORBIT_NODE_COUNT = 8;

// Slide Navigation
export const TOTAL_SLIDES = 7;

// Page Types
export const PAGE_IDS = {
  PORSCHE_PANAMERA: 'porsche-panamera',
  DUCATI_MULTISTRADA_V4: 'ducati-multistrada-v4',
  DUCATI_DESERT_X: 'ducati-desert-x',
  DUCATI_DIAVEL: 'ducati-diavel',
  DUCATI_PANIGALE_V4: 'ducati-panigale-v4',
  PORSCHE_CAYENNE: 'porsche-cayenne',
  PORSCHE_911: 'porsche-911',
  PORSCHE_TAYCAN: 'porsche-taycan',
  PORSCHE_MACAN: 'porsche-macan',
  DUCATI_MONSTER: 'ducati-monster',
  DUCATI_STREETFIGHTER: 'ducati-streetfighter',
} as const;

export type PageId = typeof PAGE_IDS[keyof typeof PAGE_IDS];

// Asset URLs - Supabase Storage
export const ASSET_BASE_URL = 'https://ldbvwhitqyolhkqxhiuw.supabase.co/storage/v1/object/public/zero-assets';

// Rate Limiting
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_ATTEMPTS = 5; // Max login attempts per window

// CORS
export const ALLOWED_ORIGINS = [
  'https://your-domain.netlify.app',
  'http://localhost:3000',
  'http://localhost:5173', // Vite default port
];

import { z } from 'zod';

// Environment variables schema
const envSchema = z.object({
  // IATA Timatic API
  IATA_API_KEY: z.string().min(1, 'IATA API key is required'),
  IATA_BASE_URL: z.string().url().default('https://api.iata.org/timatic/v3/autocheck'),

  // Google Cloud Document AI
  GOOGLE_CLOUD_PROJECT_ID: z.string().min(1, 'Google Cloud Project ID is required'),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),
  DOCUMENT_AI_LOCATION: z.string().default('eu'),

  // Redis for caching
  REDIS_URL: z.string().url().default('redis://localhost:6379'),

  // Application settings
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_BASE_URL: z.string().url().default('http://localhost:3000'),

  // Security
  JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  ENCRYPTION_KEY: z.string().min(32, 'Encryption key must be at least 32 characters'),

  // External services
  EMAIL_SERVICE_API_KEY: z.string().optional(),
  SMS_SERVICE_API_KEY: z.string().optional(),

  // Monitoring
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  SENTRY_DSN: z.string().url().optional(),
});

// Parse and validate environment variables
const env = envSchema.parse({
  IATA_API_KEY: process.env.IATA_API_KEY,
  IATA_BASE_URL: process.env.IATA_BASE_URL,
  GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  DOCUMENT_AI_LOCATION: process.env.DOCUMENT_AI_LOCATION,
  REDIS_URL: process.env.REDIS_URL,
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.API_BASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-at-least-32-chars-long',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'your-encryption-key-at-least-32-chars',
  EMAIL_SERVICE_API_KEY: process.env.EMAIL_SERVICE_API_KEY,
  SMS_SERVICE_API_KEY: process.env.SMS_SERVICE_API_KEY,
  LOG_LEVEL: process.env.LOG_LEVEL,
  SENTRY_DSN: process.env.SENTRY_DSN,
});

// Export validated environment variables
export const config = {
  iata: {
    apiKey: env.IATA_API_KEY,
    baseUrl: env.IATA_BASE_URL,
  },
  googleCloud: {
    projectId: env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: env.GOOGLE_APPLICATION_CREDENTIALS,
    documentAiLocation: env.DOCUMENT_AI_LOCATION,
  },
  redis: {
    url: env.REDIS_URL,
  },
  app: {
    nodeEnv: env.NODE_ENV,
    apiBaseUrl: env.API_BASE_URL,
  },
  security: {
    jwtSecret: env.JWT_SECRET,
    encryptionKey: env.ENCRYPTION_KEY,
  },
  services: {
    email: env.EMAIL_SERVICE_API_KEY,
    sms: env.SMS_SERVICE_API_KEY,
  },
  monitoring: {
    logLevel: env.LOG_LEVEL,
    sentryDsn: env.SENTRY_DSN,
  },
} as const;

// Type for the config object
export type Config = typeof config;

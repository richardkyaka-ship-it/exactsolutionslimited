// Environment validation during build
let envValidated = false;

try {
  const { validateEnvironment } = require('./lib/env');
  validateEnvironment();
  envValidated = true;
  console.log('✅ Environment validation passed');
} catch (error) {
  // Only fail build in production, warn in development
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Environment validation failed during build:');
    console.error(error.message);
    process.exit(1);
  } else {
    console.warn('⚠️  Environment validation warning (build will continue):');
    console.warn(error.message);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for faster navigation
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dl.airtable.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.airtableusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  async headers() {
    return [
      {
        // Apply security headers to ALL admin routes
        source: '/admin/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate, private',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    // Validate environment during production build on server-side
    if (!dev && isServer && !envValidated) {
      try {
        const { validateEnvironment } = require('./lib/env');
        validateEnvironment();
        console.log('✅ Environment validation passed (webpack)');
      } catch (error) {
        console.error('❌ Environment validation failed during webpack build:');
        console.error(error.message);
        process.exit(1);
      }
    }
    return config;
  },
}

module.exports = nextConfig

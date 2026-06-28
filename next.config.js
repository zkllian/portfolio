/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '*.replit.dev',
    '*.repl.co',
    '*.sisko.replit.dev',
    '*.kirk.replit.dev',
    '*.pike.replit.dev',
  ],
};
module.exports = nextConfig;

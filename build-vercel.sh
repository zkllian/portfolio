#!/bin/bash
set -e

pnpm --filter @workspace/barcode-gen run build

mkdir -p .vercel/output/static

cp -r artifacts/barcode-gen/dist/public/. .vercel/output/static/

cat > .vercel/output/config.json << 'EOF'
{
  "version": 3,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOF

#!/bin/sh
set -e
REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
pnpm --filter @workspace/portfolio run build
mkdir -p ".vercel/output/static"
cp -r "$REPO_ROOT/artifacts/portfolio/dist/." ".vercel/output/static/"
printf '{"version":3}' > ".vercel/output/config.json"

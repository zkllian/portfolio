#!/bin/sh
set -e
REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
pnpm --filter @workspace/portfolio run build
mkdir -p "$REPO_ROOT/.vercel/output/static"
cp -r "$REPO_ROOT/artifacts/portfolio/dist/." "$REPO_ROOT/.vercel/output/static/"
printf '{"version":3}' > "$REPO_ROOT/.vercel/output/config.json"

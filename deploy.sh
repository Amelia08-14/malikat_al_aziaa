#!/bin/bash
# ─── Deploy malikat-al-aziaa to VPS ─────────────────────────────────────────
set -e

VPS="root@72.62.171.173"
REMOTE_DIR="/var/www/malikat-al-aziaa"

echo "📦  Building..."
npm run build

echo "🚀  Syncing build to VPS..."

# Sync the standalone server
rsync -az --delete \
  .next/standalone/ \
  "$VPS:$REMOTE_DIR/"

# Sync static assets (CSS, JS chunks)
rsync -az --delete \
  .next/static/ \
  "$VPS:$REMOTE_DIR/.next/static/"

# Sync public folder (images, logo, mannequin…)
rsync -az --delete \
  public/ \
  "$VPS:$REMOTE_DIR/public/"

# Sync PM2 config
rsync -az \
  ecosystem.config.js \
  "$VPS:$REMOTE_DIR/"

echo "🔄  Restarting app on VPS..."
ssh "$VPS" "cd $REMOTE_DIR && pm2 startOrRestart ecosystem.config.js --update-env && pm2 save"

echo "✅  Deployed! → http://72.62.171.173:3000"

#!/bin/bash
# ─── One-time VPS setup — run this ONCE on your VPS ─────────────────────────
# ssh root@72.62.171.173 "bash -s" < setup-vps.sh

set -e

echo "📦  Installing Node.js 20 + PM2..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

echo "📁  Creating app directory..."
mkdir -p /var/www/malikat-al-aziaa

echo "🔧  Configuring PM2 to start on reboot..."
pm2 startup systemd -u root --hp /root
systemctl enable pm2-root

echo "✅  VPS ready. Now run deploy.sh from your local machine."

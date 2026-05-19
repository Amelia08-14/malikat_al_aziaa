module.exports = {
  apps: [
    {
      name: "malikat",
      script: "node",
      args: ".next/standalone/server.js",
      cwd: "/var/www/malikat-al-aziaa",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};

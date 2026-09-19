module.exports = {
  apps: [
    {
      name: "eval-pm2",
      script: "./server.js",
      instances: "4",
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
  ],
};

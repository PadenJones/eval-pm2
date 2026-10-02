if (process.env.TARGET !== "pm2") {
  return;
}

const config = require("./ecosystem.config.cjs");

const app = config.apps.find((a) => a.name === "eval-pm2");

Object.assign(process.env, app.env);

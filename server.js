import express from "express";
import os from "os";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const startedAt = Date.now();

app.get("/health", (req, res) => {
  const mem = process.memoryUsage();

  res.json({
    status: "ok",
    instance: process.env.NODE_APP_INSTANCE ?? "n/a",
    pid: process.pid,
    memory: {
      rssMB: Math.round(mem.rss / 1048576),
      heapUsedMB: Math.round(mem.heapUsed / 1048576),
    },
    system: {
      loadAvg: os.loadavg(),
      freeMemMB: Math.round(os.freemem() / 1048576),
      cpus: os.cpus().length,
    },
    startedAt: new Date(startedAt).toISOString(),
    uptime: Math.round(process.uptime()),
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

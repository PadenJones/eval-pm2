# eval-pm2

Quick evaluation of [PM2](https://pm2.keymetrics.io/) as a process manager for a Node.js / Express service.

The goal was to answer a few practical questions with a small, working example rather than reading docs alone:

- Can PM2 run multiple instances of an Express app behind a single port?
- Does traffic actually get spread across those instances?
- How much config does it take, and how easy is it to test?

## What's in here

| Path                        | Purpose                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `server.js`                 | Minimal Express 5 app exposing a `/health` endpoint                                         |
| `ecosystem.config.cjs`      | PM2 config: cluster mode, 4 instances, file watching, memory-based auto-restart             |
| `src/resources/LocalApi.js` | Small API client for the local server, built with `GenericJsonApi` from `@padenjones/utils` |
| `server.test.js`            | Jest test for the health endpoint against a plain `node` server                             |
| `server.pm2.test.js`        | Jest test that verifies load balancing across the PM2 cluster                               |
| `jest.setup.cjs`            | Loads the PM2 `env` settings (e.g. `PORT`) into tests when `TARGET=pm2`                     |

## The `/health` endpoint

Returns JSON describing the instance that served the request:

- `status`, `pid`, and `instance` (PM2's `NODE_APP_INSTANCE`, or `n/a` when run without PM2)
- process memory (`rssMB`, `heapUsedMB`)
- system info (load average, free memory, CPU count)
- `startedAt` and `uptime`

Because each response identifies its instance, it doubles as a way to observe how PM2 distributes requests.

## PM2 configuration

Defined in [ecosystem.config.cjs](ecosystem.config.cjs):

| Option               | Value     | Why                                                         |
| -------------------- | --------- | ----------------------------------------------------------- |
| `exec_mode`          | `cluster` | Uses Node's cluster module so instances share one port      |
| `instances`          | `4`       | Four workers, ids `0` to `3`                                |
| `watch`              | `true`    | Restarts on file changes during development                 |
| `max_memory_restart` | `300M`    | Recycles a worker that grows past 300 MB                    |
| `env.PORT`           | `3001`    | PM2 instances listen on 3001; plain `node` defaults to 3000 |

## Getting started

```bash
npm install
```

### Run without PM2

```bash
npm run dev      # node --watch server.js on port 3000
```

### Run with PM2

```bash
npm run pm2:start   # start the 4-instance cluster on port 3001
npx pm2 ls          # inspect instances
npx pm2 logs        # tail logs
npm run pm2:stop    # stop the cluster
```

## Testing

| Command            | What it runs                                                                     |
| ------------------ | -------------------------------------------------------------------------------- |
| `npm test`         | Unit tests (excludes `*.pm2.test.js`) in watch mode. Needs `npm run dev` running |
| `npm run pm2:test` | PM2 tests with `TARGET=pm2` in watch mode. Needs `npm run pm2:start` running     |

The PM2 test fires `instances * 10` requests at `/health` and asserts that every instance id (`0` to `3`) shows up in the responses, which confirms requests are load balanced across the whole cluster.

## Other scripts

```bash
npm run format   # prettier --write .
```

## Tech

Node.js (ESM), Express 5, PM2 7, Jest 30 with Babel, Prettier.

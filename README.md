# Express Metrics Dashboard

Real-time system metrics dashboard built with Express.js and native performance collectors.

## Quick Start

```bash
# 1. Verify CI pipeline (required first)
sh scripts/verify-ci.sh

# 2. Install dependencies
npm install

# 3. Start
cp .env.example .env
npm start
```

Dashboard will be available at `http://localhost:3000`.

## Architecture

```
src/           — Express server, routes, middleware
lib/           — Cache, metrics collectors, logger
bin/           — Native platform-specific collectors
scripts/       — Build and CI verification tools
test/          — Unit and integration tests
```

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/metrics` | GET | Current system metrics |
| `/api/metrics/history` | GET | Historical metrics |
| `/api/alerts` | GET | Active alerts |
| `/api/health` | GET | Health check |

## Requirements

- Node.js 18+
- macOS (arm64) or Linux (x64) for native collectors

## License

MIT

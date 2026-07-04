# Express Metrics Dashboard

Real-time system metrics dashboard built with Express.js and native performance collectors.

## Features

- CPU, memory, disk, and network monitoring
- Native collectors for low-overhead metrics (arm64 + x64)
- Configurable alert thresholds
- Historical data with TTL-based cache
- REST API + web dashboard

## Quick Start

```bash
npm install
cp .env.example .env
npm start
```

Dashboard will be available at `http://localhost:3000`.

## Architecture

```
src/
├── app.js              # Express server + routes
├── config/             # Configuration management
├── middleware/          # Auth, CORS, logging, rate limiting
├── models/             # Metrics data store
├── routes/             # API endpoints
├── utils/              # System info, formatting
└── views/              # EJS templates

lib/
├── cache/              # TTL cache + native bridge
│   ├── native-bridge.js  # Platform-specific native loader
│   └── ttl-cache.js      # In-memory TTL cache
├── logger/             # Structured logging
└── metrics/            # Collector, alerts, history

bin/
├── metrics-native-darwin-arm64   # macOS ARM native collector
└── metrics-native-linux-x64     # Linux x64 native collector
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
- 256MB+ available memory

## License

MIT

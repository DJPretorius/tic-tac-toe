# Tick-Tack-Bird

A Tic Tac Toe game implementation using vanilla JavaScript, HTML, and CSS.

## Prerequisites

- Node.js v20.14.0 (use nvm for version management)
- pnpm package manager

## Setup

1. Install the correct Node.js version:
```bash
nvm install 20.14.0
nvm use
```

2. Install dependencies:
```bash
pnpm install
```

3. Run development server:
```bash
pnpm dev
```

## Testing

### Unit Tests
```bash
pnpm test
```

### E2E Tests
```bash
pnpm test:e2e
```

## Build

To build for production:
```bash
pnpm build
```

To preview the production build:
```bash
pnpm preview
```

## Project Structure

```
├── src/           # Source files
├── tests/         # Test files
│   ├── unit/     # Unit tests
│   └── e2e/      # End-to-end tests
├── public/        # Static assets
└── index.html     # Entry point
``` 
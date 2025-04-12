# Tic Tac Toe

A Tic Tac Toe game implementation using vanilla JavaScript, HTML, and CSS.

## Live Demo
The game is deployed at: [https://djpretorius.github.io/tic-tac-toe](https://djpretorius.github.io/tic-tac-toe)

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

## Continuous Integration

This project uses GitHub Actions for CI/CD. The workflow includes:

### Automated Tests
- Unit tests run on every pull request and push to main
- E2E tests run on every pull request and push to main
- Test coverage reports are generated

### Build Process
- Automated builds run after tests pass
- Automatic deployment to GitHub Pages
- Build artifacts are stored for future reference

### Development Workflow
1. Create a new branch for your feature/fix
2. Make your changes and commit them
3. Create a pull request to merge into main
4. Wait for all tests to pass
5. Request review
6. Merge after approval

### Status Badges
[![CI/CD](https://github.com/DJPretorius/tic-tac-toe/actions/workflows/ci.yml/badge.svg)](https://github.com/DJPretorius/tic-tac-toe/actions/workflows/ci.yml) 
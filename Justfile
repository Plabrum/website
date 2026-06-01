# Website Justfile — https://just.systems

default:
    @just --list

# ─── Install ──────────────────────────────────────────────────────────────────

# Install dependencies
install:
    pnpm install

# ─── Development ────────────────────────────────────────────────────────────────

# Start the Next.js dev server
dev:
    pnpm dev

# Start the production server (requires a prior `just build`)
start:
    pnpm start

# ─── Code Quality ─────────────────────────────────────────────────────────────

# Lint
lint:
    pnpm lint

# Check formatting
format:
    pnpm format

# Format all files in place
format-fix:
    pnpm format:fix

# ─── Build ────────────────────────────────────────────────────────────────────

# Build for production
build:
    pnpm build

# ─── Sanity ───────────────────────────────────────────────────────────────────

# Extract schema and regenerate Sanity types
typegen:
    pnpm typegen

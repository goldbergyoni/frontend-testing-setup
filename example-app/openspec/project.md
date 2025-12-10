# Project Context

## Purpose

A React SPA template demonstrating modern frontend testing infrastructure with best practices. The project serves as a reference implementation for setting up comprehensive testing tools and patterns in a Vite-based React application.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for build tooling
- **React Query (TanStack Query v4)** for server state management
- **React Router 7** for routing
- **Zustand** for client state management
- **Chakra UI v2** for component library
- **i18next** for internationalization
- **MSW 2** for API mocking
- **Vitest 4** for unit and component testing
- **Storybook 9** for component development and visual testing
- **Playwright** for E2E testing
- **PNPM** as package manager

## Project Conventions

### Code Style

- Prettier with 80-char line width
- ESLint with flat config for linting
- Imports sorted via eslint-plugin-import
- Components and providers use `PascalCase`
- Hooks, functions, utilities use `kebab-case`
- Path aliases: `@/*` maps to `src/`
- Prefer functions over classes
- Prefer `type` over `interface`
- Use TypeScript inference where possible
- Avoid `any`; use `unknown` if necessary

### Architecture Patterns

Feature slice architecture with clean architecture principles:

```
src/
├── app/           # App-level configuration
├── features/      # Feature modules (auth, carts, products)
│   └── [feature]/
│       ├── presentation/    # UI components
│       ├── application/     # Business logic, hooks
│       ├── infrastructure/  # Data fetching, DTOs
│       └── types/           # Type definitions
├── lib/           # Shared libraries
│   ├── api/       # Centralized API layer
│   ├── components/# Reusable UI components
│   ├── http/      # HTTP client
│   ├── i18n/      # Internationalization
│   ├── router/    # Routing utilities
│   └── theme/     # Theme configuration
├── pages/         # Route-level page components
└── test-lib/      # Testing utilities and fixtures
```

Key patterns:

- Co-location of related files (component + story + test)
- Centralized API logic in `src/lib/api/`
- MSW handlers centralized in `test-lib/handlers/`
- Fixture pattern for test data in `test-lib/fixtures/`

### Testing Strategy

- **Storybook tests**: `.stories.tsx` files for component testing
- **E2E tests**: Playwright for end-to-end scenarios
- All tests must follow rules in `testing-best-practices.md`
- Focus on business logic, not implementation details
- MSW for API mocking in both dev and test environments
- IMPORTANT: Each tasks phase must start by declaring the tests title, and must end with ensuring the tests pass
- IMPORTANT: A proposal must contain tests definition in the form of 'when...then'

### Git Workflow

- Main branch: `main`
- AI should not commit/push without explicit developer request
- Use Husky for pre-commit hooks (prettier-quick)

## Domain Context

E-commerce application with features for:

- User authentication
- Product catalog browsing
- Shopping cart management

## Important Constraints

- AI must not touch test files unless explicitly requested
- Changes >300 LOC or >3 files require confirmation
- API contracts cannot be changed without developer approval
- Must use `AIDEV-NOTE:` anchor comments for complex/important code
- Always consult developer when unsure about implementation

## External Dependencies

- Uses mock API via MSW (no real backend required)
- Storybook dev server on port 6006
- Vite dev server on port 5173

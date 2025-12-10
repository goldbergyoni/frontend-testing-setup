# Project Context

## Purpose
A React SPA template demonstrating modern frontend testing infrastructure and best practices. This project serves as a reference implementation for setting up comprehensive testing with Vitest, Storybook, and Playwright, showcasing feature-slice architecture with clean architecture principles.

## Tech Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 with SWC
- **Package Manager**: PNPM 10.13.1
- **State Management**: Zustand (local state), React Query/TanStack Query (server state), XState (state machines)
- **Routing**: React Router 7 with file-based routing
- **UI Library**: Chakra UI 2 with Emotion
- **Internationalization**: i18next with chained backend
- **HTTP Client**: Ky
- **Testing**: Vitest 4 (unit/integration), Storybook 9 (component), Playwright (e2e)
- **API Mocking**: MSW 2 for development and testing
- **Type Checking**: TypeScript 5.8
- **Linting**: ESLint 9 with flat config
- **Formatting**: Prettier with 80-char lines

## Project Conventions

### Code Style
- **Components & Providers**: `PascalCase`, co-located with `PascalCase.stories.tsx`
- **Hooks, Functions, Classes**: `kebab-case`, co-located with `kebab-case.test.ts`
- **Formatting**: Prettier with 80-character line limit
- **Imports**: Sorted using eslint-plugin-import
- **Path Resolution**: `@/*` mapping to `src/`
- **Comments**: Minimize comments; prefer clear naming. Use `AIDEV-NOTE:`, `AIDEV-TODO:`, `AIDEV-QUESTION:` anchors where complexity warrants it
- **Async Code**: Always use async/await with try/catch blocks
- **TypeScript**: Leverage inference; prefer `type` over `interface`; avoid `any`, use `unknown` instead
- **React**: Functional components with hooks; extract complex `useEffect` logic into custom hooks

### Architecture Patterns
**Feature Slice Architecture** with three-layer structure:
- **presentation/**: UI components, UI-wise hooks
- **application/**: Business logic, state management, logic-wise hooks
- **infrastructure/**: Data fetching, external APIs, contracts, DTOs
- **types/**: Type definitions

**Key Principles**:
- **Co-location**: Related files (component + story + test) grouped together
- **Centralized API**: All API logic in `src/lib/api/` with endpoint-based organization
- **Component Composition**: Features export composed components for pages to use
- **Strong Typing**: Comprehensive TypeScript with branded types
- **Lazy Loading**: Code splitting based on React Router
- **Error Boundaries**: Using `react-error-boundary` for runtime errors

**Project Structure**:
```
src/
├── app/           # App-level config (App.tsx, Providers.tsx)
├── features/      # Feature modules (auth, carts, products)
├── lib/           # Shared libraries (api, components, http, i18n, router, theme)
├── pages/         # Route-level page components
└── test-lib/      # Testing utilities and fixtures
```

### Testing Strategy
**MANDATORY: All tests must follow rules in `testing-best-practices.md`**

**Core Principles**:
- **The 6 Most Important Rules**: Max 10 statements, no control flow, cover all layers, smoking gun principle, self-contained tests, minimal assertions
- **Test Structure**: AAA pattern (Arrange, Act, Assert) with clear phases
- **Data Factories**: Use builder pattern with faker.js for realistic data
- **Mocking**: Only mock external collaborators; prefer MSW for HTTP; never mock internal code
- **DOM Testing**: ARIA-based locators only (getByRole, getByLabel); no test-ids or CSS selectors
- **Co-location**: Tests alongside source files

**Testing Layers**:
- **Unit Tests**: `.test.ts/.test.tsx` with Vitest
- **Component Tests**: `.stories.tsx` with Storybook + Vitest
- **E2E Tests**: Playwright for cross-process flows
- **Coverage**: Istanbul with LCOV reports

**Test Commands**:
- `pnpm test` - Run all tests
- `pnpm test:unit` - Unit tests only
- `pnpm test:storybook` - Storybook tests only
- `pnpm test:coverage` - Tests with coverage

### Git Workflow
- **Branch Strategy**: Main branch for stable code
- **Commit Convention**: AI must never stage, commit, or push without explicit developer request
- **Large Changes**: Request confirmation for changes >300 LOC or >3 files
- **API Contracts**: Require explicit approval before modifying endpoints, DTOs, or mapping logic

## Domain Context
This is an e-commerce SPA template with three main features:
- **Authentication**: User login/registration with role-based access
- **Product Catalog**: Browse and search products
- **Shopping Cart**: Add/remove items and checkout

The project demonstrates real-world patterns while serving as a testing best practices showcase.

## Important Constraints
- **Maintainability Over Cleverness**: Choose boring, simple solutions
- **No Assumptions**: Always ask for clarification when unsure about requirements or business logic
- **Test Ownership**: AI must not modify test files unless explicitly requested
- **File Creation**: Strongly prefer editing existing files over creating new ones
- **Planning Required**: Always plan work first, write to `.claude/tasks/TASK_NAME.md`, get approval before implementation
- **Anchor Comments**: Add `AIDEV-*` anchors for complex/important code; never delete them
- **Only Referenced Files**: Work only with files explicitly mentioned in prompts

## External Dependencies
- **MSW Worker**: Service worker for API mocking in browser (workerDirectory: `public`)
- **Backend APIs**: All API interactions mocked via MSW handlers in `test-lib/handlers/`
- **Font Assets**: Inter font from Fontsource
- **Browser Support**: Production targets >0.2% usage, not dead, last 2 versions

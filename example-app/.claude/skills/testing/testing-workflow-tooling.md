# 🛠️ Testing Workflow & Tooling

Which test runners, libraries, and tools to prefer. Reference this when setting up tests to ensure you're using the recommended frameworks and following project conventions.

---

## 🧪 Test Runners

| Tool | Use For | Notes |
|------|---------|-------|
| **Vitest** | Unit tests, integration tests | Primary test runner. Fast, Vite-native. |
| **Storybook** | Component tests | Visual testing, component isolation. |
| **Playwright** | E2E tests (if needed) | Browser automation, real user flows. |

---

## 📚 Testing Libraries

| Library | Purpose | When to Use |
|---------|---------|-------------|
| **@testing-library/react** | DOM testing utilities | Query elements by role, label, text. Prefer over direct DOM queries. |
| **@testing-library/user-event** | User interaction simulation | Simulate clicks, typing, etc. More realistic than fireEvent. |
| **MSW (Mock Service Worker)** | API mocking | Mock HTTP requests at network level. Prefer over function mocks for API calls. |
| **faker-js** | Test data generation | Generate realistic test data. Use in data factories. |

---

## 🎯 Preferred Patterns

### Element Selection
```typescript
// ✅ Prefer - accessible queries
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Email')
screen.getByText('Welcome')

// ❌ Avoid - implementation details
screen.getByTestId('submit-btn')
document.querySelector('.submit-button')
```

### API Mocking
```typescript
// ✅ Prefer - MSW network interception
import { http, HttpResponse } from 'msw'

http.get('/api/users', () => {
  return HttpResponse.json([buildUser(), buildUser()])
})

// ❌ Avoid - function mocking for HTTP calls
vi.mock('./api', () => ({
  fetchUsers: vi.fn().mockResolvedValue([...])
}))
```

### Test Data
```typescript
// ✅ Prefer - data factories with types
const user = buildUser({ role: 'admin' })

// ❌ Avoid - inline objects without types
const user = { id: 1, name: 'test', role: 'admin' }
```

---

## 📁 Project Structure

```
src/
├── features/
│   └── auth/
│       ├── login.ts
│       ├── login.test.ts          # Co-located unit test
│       └── LoginForm.stories.tsx  # Co-located component test
└── test-lib/
    ├── fixtures/                  # Data factories (buildUser, buildOrder)
    ├── handlers/                  # MSW handlers
    └── setup.ts                   # Test setup configuration
```

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration |
| `.storybook/` | Storybook configuration |
| `playwright.config.ts` | Playwright configuration (if E2E tests exist) |

---

## 💡 Tips

- **Co-locate tests** with source files (`.test.ts` next to `.ts`)
- **Use existing fixtures** from `test-lib/fixtures/` before creating new ones
- **Check existing handlers** in `test-lib/handlers/` for API endpoints
- **Follow existing patterns** in the codebase for consistency

# 📐 Test Patterns, Practices & Rules

Mandatory rules and best practices for writing tests. **These rules must be read and followed every time tests are written.** Violations should be caught and fixed immediately.

---

## 📖 Full Reference

For comprehensive rules with detailed examples, see:
**[testing-best-practices.md](../../testing-best-practices.md)**

⚠️ **You must read the full document before writing tests.** The summary below is for quick reference only.

---

## ⚠️ The 6 Critical Rules

These are non-negotiable. Stop and fix immediately if violated:

| # | Rule | Why |
|---|------|-----|
| 1 | **Max 10 statements** | Tests must be simple enough to read at a glance. |
| 2 | **No unnecessary details** | Only include data and setup that directly affects the test result. |
| 3 | **Totally flat** | No if/else, loops, try-catch, console.log - ever. |
| 4 | **Mock only external systems** | Never mock internal application code, only external collaborators. |
| 5 | **🔫 Smoking gun** | Every value in assertion must trace back to the arrange phase. |
| 6 | **Self-contained** | Each test creates its own state, never relies on other tests. |

---

## 🏗️ Test Structure (AAA)

Every test must follow Arrange-Act-Assert with clear separation:

```typescript
test('When filtering by active, then only active orders shown', async () => {
  // Arrange
  const activeOrder = buildOrder({ status: 'active' })
  const completedOrder = buildOrder({ status: 'completed' })
  http.get('/api/orders', () => HttpResponse.json([activeOrder, completedOrder]))

  // Act
  render(<OrdersReport />)
  await userEvent.click(screen.getByRole('button', { name: 'Filter Active' }))

  // Assert
  expect(screen.getByText(activeOrder.customerName)).toBeVisible()
  expect(screen.queryByText(completedOrder.customerName)).not.toBeInTheDocument()
})
```

---

## 🔑 Key Patterns

### 🔫 Smoking Gun Principle
Data in assertion must trace back to arrange - this shows cause and effect:
```typescript
// ✅ Good - activeOrder from arrange appears in assertion
expect(screen.getByText(activeOrder.customerName)).toBeVisible()

// ❌ Bad - magic string with no traceable origin
expect(screen.getByText('John Doe')).toBeVisible()
```

### 🥨 Breadcrumb Principle
Anything affecting the test should be visible in the test or beforeEach:
```typescript
beforeEach(() => {
  // Context visible here, not hidden in external setup file
  http.get('/api/user', () => HttpResponse.json(buildUser({ role: 'viewer' })))
})
```

### 🚀 Extra Mile Principle
Test slightly more than the minimum to catch subtle bugs:
```typescript
// Not just "item appears" but also "wrong item doesn't appear"
expect(screen.getByText(activeOrder.name)).toBeVisible()
expect(screen.queryByText(completedOrder.name)).not.toBeInTheDocument()
```

### 🔥 Deliberate Fire Principle
Choose data most likely to reveal bugs:
```typescript
// ✅ Good - least privileged role
const user = buildUser({ role: 'viewer' })

// ❌ Bad - admin hides permission bugs
const user = buildUser({ role: 'admin' })
```

---

## 🎯 DOM Testing Rules

| Do | Don't |
|----|-------|
| `getByRole('button', { name: 'Submit' })` | `getByTestId('submit-btn')` |
| `getByLabelText('Email')` | `querySelector('.email-input')` |
| Assert on visible user behavior | Assert on internal component state |
| Use framework's auto-wait assertions | Use `setTimeout` or manual waits |

---

## 📦 Data Factories

Always use typed factories from `test-lib/fixtures/`:

```typescript
// ✅ Good - typed, with sensible defaults and overrides
const order = buildOrder({ status: 'active' })

// ❌ Bad - inline object without type safety
const order = { id: 1, status: 'active', name: 'test' }
```

---

## 🚨 Common Violations

| Violation | Rule # | Fix |
|-----------|--------|-----|
| Test has 15 statements | 1 | Split into smaller tests |
| Loop in test to check items | 3 | Use single assertion with array |
| Mocking internal service | 4 | Mock at network level with MSW |
| Assertion uses hardcoded "123" | 5 | Reference arranged data instead |
| Using `getByTestId` | F.1 | Use role/label-based locators |

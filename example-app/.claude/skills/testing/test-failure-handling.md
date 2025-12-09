# 🔧 Test Failure Handling

How to debug and resolve test failures of any kind. When tests fail - whether from assertion mismatches, timeouts, flakiness, or infrastructure issues - use this guide to systematically diagnose and fix the problem.

---

## 🔴 Assertion Failures

**Symptoms**: `Expected X but received Y`, `toBe` or `toEqual` mismatch

### Diagnosis Steps
1. **Check the smoking gun** - Is the expected value traceable to the arrange phase?
2. **Verify mock data** - Does the MSW handler return what you expect?
3. **Check async timing** - Did you await all async operations before asserting?
4. **Inspect actual value** - Add temporary logging to see what's actually there

### Common Causes & Fixes

| Cause | Example | Fix |
|-------|---------|-----|
| Mock returns wrong data | Handler returns `{ name: 'Jane' }` but test expects 'John' | Update mock to match expectation |
| Missing await | `userEvent.click()` not awaited | Add `await` before async operations |
| Wrong locator | `getByText('Submit')` but button says 'Save' | Use `browser_snapshot` to find correct text |
| Stale reference | Asserting on old data after re-render | Query element again after action |

### Debugging Example
```typescript
// ❌ Failing: expected "John" but got "Jane"
expect(screen.getByText('John')).toBeVisible()

// Debug steps:
// 1. Check the mock - what does it return?
http.get('/api/user', () => HttpResponse.json({ name: 'Jane' })) // Found it!

// 2. Fix: Either update mock OR update assertion to match reality
```

---

## ⏱️ Timeout Failures

**Symptoms**: `Exceeded timeout of 5000ms`, `Waiting for element to be visible`

### Diagnosis Steps
1. **Check if element exists** - Use `browser_snapshot` to see current page state
2. **Verify navigation completed** - Did the page actually load?
3. **Check for JS errors** - Use `browser_console_messages`
4. **Verify the trigger** - Did the action that should show the element actually happen?

### Common Causes & Fixes

| Cause | Example | Fix |
|-------|---------|-----|
| Element doesn't exist | Looking for 'Submit' but it's 'Save' | Use snapshot to find correct locator |
| Wrong selector | `getByRole('button')` matches wrong button | Be more specific with `{ name: '...' }` |
| Element appears later | Data fetching delays render | Use `waitFor` or auto-retrying assertions |
| Navigation not complete | Page still loading | Wait for specific content before acting |

### Debugging Tools
```bash
# See what's actually on the page
mcp__playwright__browser_snapshot

# Check for JavaScript errors preventing render
mcp__playwright__browser_console_messages

# Check if API calls completed
mcp__playwright__browser_network_requests
```

---

## 🎲 Flaky Tests

**Symptoms**: Test passes sometimes, fails other times (intermittent)

### Diagnosis Steps
1. **Run multiple times** - `pnpm test -- --repeat=5` to confirm flakiness
2. **Look for race conditions** - Async operations without proper waits
3. **Check for shared state** - Something leaking between tests
4. **Check for time-dependent logic** - Code using `Date.now()` or timers

### Common Causes & Fixes

| Cause | Example | Fix |
|-------|---------|-----|
| Race condition | Click before element ready | Add proper `waitFor` |
| Shared state | Global variable modified by tests | Reset in `beforeEach` |
| Time-dependent | Test depends on current time | Mock timers with `vi.useFakeTimers()` |
| Random data collision | Two tests create same ID | Use unique identifiers |
| Animation timing | Assert during CSS transition | Wait for animation to complete |

### Fix Example
```typescript
// ❌ Flaky: element might not be ready
await userEvent.click(button)
expect(screen.getByText('Success')).toBeVisible()

// ✅ Stable: explicitly wait for result
await userEvent.click(button)
await waitFor(() => {
  expect(screen.getByText('Success')).toBeVisible()
})
```

---

## 🌐 Environment Failures

**Symptoms**: Tests fail before running, app won't start, connections fail

### App Won't Start

```bash
# Check if port is already in use
lsof -i :5173

# Kill process on port if needed
kill -9 <PID>

# Try starting again
pnpm dev
```

### MCP Connection Issues

1. Verify Playwright MCP server is running
2. Check browser launched successfully
3. Try `browser_navigate` to confirm connection works
4. Restart the MCP server if needed

### Dependency Issues

```bash
# Reinstall dependencies
pnpm install

# If that doesn't work, clear and reinstall
rm -rf node_modules && pnpm install

# Clear test cache if tests behave strangely
rm -rf .vitest
```

### Port Conflicts

| Port | Used By | Fix |
|------|---------|-----|
| 5173 | Dev server | Kill existing process or use different port |
| 6006 | Storybook | Kill existing process |

---

## 🔍 General Debugging Tools

| Situation | Tool to Use |
|-----------|-------------|
| Need to see page structure | `mcp__playwright__browser_snapshot` |
| Check for JavaScript errors | `mcp__playwright__browser_console_messages` |
| See what API calls happened | `mcp__playwright__browser_network_requests` |
| Visual debugging | `mcp__playwright__browser_take_screenshot` |

---

## 🚨 When to Escalate

Ask the developer for help if:

- **Can't determine expected behavior** - Business logic is unclear
- **Would require mocking internal code** - Violates rule 4
- **Environment issue persists** - After troubleshooting steps fail
- **Test requires implementation knowledge** - You need to know internal details
- **Flakiness can't be resolved** - After multiple fix attempts

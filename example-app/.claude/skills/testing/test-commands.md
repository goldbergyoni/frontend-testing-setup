# 🚀 Start & Test Commands

Commands to start the application and run tests. Use these to get the system running for investigation, establish baseline by running tests before adding new ones, and verify your tests pass after writing them.

---

## 🖥️ Start Commands

Get the application running so you can investigate its behavior before writing tests.

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 5173. Use this to navigate and inspect the app with Playwright MCP tools. |
| `pnpm storybook` | Start Storybook on port 6006. Use this to view and test individual components in isolation. |

---

## 🧪 Test Commands

Run tests to establish baseline before writing new tests, and again after writing to verify they pass.

| Command | Description |
|---------|-------------|
| `pnpm test` | Run all tests (unit + storybook). Use as final verification. |
| `pnpm test:unit` | Run unit tests only. Fast feedback during development. |
| `pnpm test:storybook` | Run storybook component tests only. |
| `pnpm test:coverage` | Run tests with coverage report. Use to measure test impact. |

### CI Commands
| Command | Description |
|---------|-------------|
| `pnpm test:unit:ci` | Unit tests with coverage and reports for CI pipelines. |
| `pnpm test:storybook:ci` | Storybook tests with coverage and reports for CI pipelines. |

---

## 📊 Coverage Tools

Use after running tests to verify coverage improvements:

```bash
# Get overall project coverage
mcp__test-coverage__coverage_summary

# Get coverage for the specific file you're testing
mcp__test-coverage__coverage_file_summary --filePath="src/features/auth/login.ts"
```

---

## 💡 Typical Flow

```
1. pnpm dev                    → Start app for investigation
2. [Use Playwright MCP tools]  → Inspect page, network, console
3. pnpm test                   → Run existing tests (baseline)
4. [Write your tests]
5. pnpm test                   → Verify new tests pass
6. pnpm test:coverage          → Check coverage impact
```

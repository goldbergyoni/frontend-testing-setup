# ✅ Test Verification

Actions and reports that must be conducted after finalizing tests. Execute this checklist after completing your testing mission to ensure quality and coverage goals are met before considering the work done.

---

## 📋 Verification Checklist

Complete all items before marking testing work as done:

### Tests Pass
- [ ] All tests pass: `pnpm test`
- [ ] No skipped tests left behind (`.skip` or `.only`)
- [ ] Tests pass on re-run (run 2-3 times to catch flakiness)

### Coverage Verification
- [ ] Coverage improved or maintained (use diff tool below)
- [ ] Critical paths have coverage
- [ ] No obvious gaps in tested scenarios

### Quality Check
- [ ] Tests follow all patterns in [test-patterns.md](./test-patterns.md)
- [ ] No violations of the 6 critical rules
- [ ] Test titles follow "When X, then Y" pattern
- [ ] Data comes from factories, not inline objects

### Console & Errors
- [ ] No console errors during test run
- [ ] No warnings that indicate problems

---

## 🔧 Coverage Verification Workflow

Execute these steps to verify your tests improved coverage:

```bash
# 1. If you recorded baseline earlier, check the diff now
mcp__test-coverage__get_diff_since_start --lcovPath="coverage/lcov.info"
# → Should show positive diff (more lines covered)

# 2. Check specific file coverage
mcp__test-coverage__coverage_file_summary --filePath="src/features/auth/login.ts"
# → Verify the file you tested has good coverage

# 3. Check overall project coverage
mcp__test-coverage__coverage_summary
# → Understand overall project health
```

---

## 🚨 Red Flags - Stop and Fix

| Red Flag | What It Means | Action |
|----------|--------------|--------|
| Test passes but coverage unchanged | Test isn't exercising the code you think | Review test setup, check mocks |
| Flaky test (passes sometimes) | Race condition or timing issue | Add proper waits, check async handling |
| Console errors during tests | Something is broken | Fix the errors before proceeding |
| Coverage decreased | Removed tests or broke something | Investigate and restore coverage |
| Test title doesn't match behavior | Test doing something different than stated | Rename or fix the test |

---

## 📊 Final Report Template

After completing verification, summarize your work:

```markdown
## Test Summary

**Files tested**: [list files]
**Tests added**: X new tests
**Tests modified**: X existing tests

**Coverage impact**:
- Before: X%
- After: Y%
- Change: +Z%

**Scenarios covered**:
- [Happy path scenario]
- [Edge case 1]
- [Error condition]

**Verification status**: ✅ All checks passed
```

---

## 💡 Tips

- Run `pnpm test` multiple times to catch flaky tests before they hit CI
- If coverage didn't improve, ask: "Is my test actually running the code?"
- Coverage diff is more meaningful than absolute numbers
- Document any scenarios intentionally not tested and why

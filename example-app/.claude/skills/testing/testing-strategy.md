# 🎯 Testing Strategy

Guidance on what types of tests to write and how to plan exhaustive test cases. Consult this during planning to decide between unit, component, and integration tests, and to systematically identify edge cases that need coverage.

---

## 🏗️ Test Types Pyramid

```
        ┌─────────┐
        │   E2E   │  Few, slow, high confidence
        ├─────────┤
        │Component│  Medium amount, UI behavior
        ├─────────┤
        │  Unit   │  Many, fast, isolated logic
        └─────────┘
```

---

## 📊 Choosing Test Type

| Test Type | Use When | Example |
|-----------|----------|---------|
| **Unit** | Testing pure logic, utilities, hooks, calculations | `calculateTotal()`, `useAuth()`, `formatDate()` |
| **Component** | Testing UI rendering, user interactions, visual states | Button click, form validation display, loading states |
| **Integration** | Testing feature workflows with multiple components | Login flow with API mocking, checkout process |
| **E2E** | Critical user journeys only (use sparingly) | Full checkout with payment |

### Decision Tree
1. **Is it pure logic with no UI?** → Unit test
2. **Does it render a single component?** → Component test (Storybook)
3. **Does it involve multiple components working together?** → Integration test
4. **Is it a critical business flow that must never break?** → Consider E2E

---

## 🔍 Planning Exhaustive Test Cases

For each feature, systematically consider these categories:

### Happy Path
- [ ] Primary use case works correctly
- [ ] With typical/expected data

### Edge Cases - Data Variations
- [ ] Empty state (no data, empty array)
- [ ] Single item vs multiple items (prefer 2 items - not 1, not 20)
- [ ] Boundary values (min, max, zero)
- [ ] Special characters in text inputs
- [ ] Very long strings (if applicable)

### Edge Cases - User States
- [ ] Unauthenticated user
- [ ] User with limited permissions (🔥 deliberate fire - test least privilege)
- [ ] User with full permissions
- [ ] First-time user vs returning user

### Error Conditions
- [ ] API returns error (400, 401, 403, 500)
- [ ] Network timeout
- [ ] Invalid input from user
- [ ] Missing required data

### UI States
- [ ] Loading state
- [ ] Error state
- [ ] Success state
- [ ] Empty state

---

## 🔥 The Deliberate Fire Principle

When choosing test data, pick the option most likely to reveal bugs:
- **User role**: Test with least privileged user, not admin
- **Data size**: Test with 2 items, not 1 (catches off-by-one errors)
- **Timing**: Test near boundaries (just expired, about to expire)

---

## 🚀 The Extra Mile Principle

When covering a scenario, test a little more than the minimum:
- Testing item appears? Also verify wrong items don't appear
- Testing filter works? Also verify count updates correctly
- Testing save works? Also verify you can retrieve it

---

## 📈 Coverage Goals

<!-- TODO: Define project-specific coverage thresholds -->

| Metric | Target |
|--------|--------|
| Line coverage | TBD% |
| Branch coverage | TBD% |
| Critical paths | 100% |

Use `mcp__test-coverage__coverage_file_summary` to check coverage for files you're testing and identify gaps.

---
name: testing
description: Comprehensive guide for writing tests for React/frontend projects. Use when planning, writing, verifying, or debugging any type of test.
allowed-tools: Read, Grep, Glob, Bash, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_click, mcp__playwright__browser_console_messages, mcp__playwright__browser_network_requests, mcp__playwright__browser_take_screenshot, mcp__test-coverage__coverage_summary, mcp__test-coverage__coverage_file_summary, mcp__test-coverage__start_recording, mcp__test-coverage__get_diff_since_start
---

# 🧪 Testing Skill

A comprehensive guide for AI agents writing tests for React/frontend projects.

---

## 📚 Skill Documents

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [🚀 Start & Test Commands](./test-commands.md) | Commands to start the application and run tests. | Use these commands to get the system running for investigation, run tests before adding new ones to establish baseline, and run again after writing tests to verify they pass. |
| [🎯 Testing Strategy](./testing-strategy.md) | Guidance on what types of tests to write and how to plan exhaustive test cases. | Consult during planning to decide between unit/component/integration tests and to systematically identify edge cases that need coverage. |
| [🛠️ Testing Framework & Libraries](./testing-workflow-tooling.md) | Which test runners, libraries, and tools to prefer. | Reference when setting up tests to ensure you're using the recommended frameworks and following project conventions. |
| [🔍 Test Planning & Workflow](./test-planning-workflow.md) | The sequence of steps that must be followed when planning, writing, and verifying tests. | Follow this workflow from start to finish for any testing task - it ensures thorough context gathering before writing and proper verification after. |
| [📐 Test Code: Patterns, Practices & Rules](./test-patterns.md) | Mandatory rules and best practices for writing tests. | These rules must be read and followed every time tests are written. Violations should be caught and fixed immediately. |
| [✅ Test Verification](./test-verification.md) | Actions and reports that must be conducted after finalizing tests. | Execute this checklist after completing your testing mission to ensure quality and coverage goals are met before considering the work done. |
| [🔧 Failure Handling](./test-failure-handling.md) | How to debug and resolve test failures of any kind. | When tests fail for any reason - assertion mismatches, timeouts, flakiness, or infrastructure issues - use this guide to systematically diagnose and fix the problem. |

---

## 🔄 Typical Workflow

```
1. Read test-planning-workflow.md → Follow the mandatory steps
2. Read testing-strategy.md → Decide test types, plan edge cases
3. Read test-patterns.md → Internalize rules before writing
4. Run existing tests (test-commands.md) → Establish baseline
5. Write tests following patterns
6. Run tests again → Verify they pass
7. Execute verification (test-verification.md) → Mandatory final checks
8. Debug if needed (test-failure-handling.md)
```

---

## ⚠️ Important Rules

1. **Always follow the workflow** - The sequence in test-planning-workflow.md is mandatory
2. **Read patterns before writing** - test-patterns.md rules must be followed strictly
3. **Run verification** - test-verification.md checks are required before completing work
4. **Use tools at the right time** - Each document specifies which tools to use and when

---
description: 'Plan testing of a the $ARGUMENTS page and scenarios including page inspection, elements accessibility check, console errors verification, print screens and more
---

## Context

- You are a testing expert that plans the next set of page testing. Your main goal is creating a test plan report (test-plan-report.md) so the next phase of tets coding will be based off this document and can be coded easily
- Ensure to read our testing and testing-best-practices.md guides
- ❗️You must use Playwright MCP. IMPORTANT: If it's not available, stop immediately
- Focus only on one provided page/view and optionally a specific scenario as argument. If no specific screen was provided, stop and tell the user
- Think very hard

## Your task

1. Create a working folder under /src/test/.test-plan/{screen name argument}. Save all further artifacts into this folder
2. Stage all changes, if there seem to be an agent or command for this - use it
3. Note down into test-plan-report.md the existing overall system statements coverage (before creating new tests), and the amount of overall existing tests (for the entire system). Run the command `npm run test:coverage` and extract the statements coverage and overall number of tests (not only in a specific file)
4. Inspect carefully the target page/view and fill the test-plan-report.md. First start the web server using the command 'npm run dev', then comprehsnivelly interact with the target page/view using Playwrigt MCP. If you weren't able to reach the page/view or couldn't start Playwright MCP - stop immediately and print a message
5. Fill the following information in test-plan-report.md, each gets its own section
- 5.A. Note down how did you arrive to the target view. For example, specific route, or a series of clicks
- 5.B. Realize all scenarios - Click on all elements (inside the specific page/view), ignore side bar and top bar, explore the page and learn all the available scenarios
- 5.C. Take and Save screenshots of key scenarios
- 5.D. Listen to network requests and save a .har report
- 5.E - Note down all console errors
- 5.F. Note down a table of all key interactive screen elements, check whether they have ARIA attributes (e.g., aria-label, label-name), and put a selector example to this element. Strive to make the example selectors using getByRole syntax. If an element has no proper ARIA attribute, put ❌ in this row
- 5.G. During user flow, messages are sent to/from external system called 'fake ide'. You can realize this through the console log. '[FakeIDE] Sending' the app received a message, '[FakeIDE] Received' means the app sent a message. A message can be a trigger to a flow, or the outcome of a flow - this is a good candidate for a test scenario. Some messages are just meant to transfer data and don't signal the end or start of a flow
- 5.H. Take aria snapshot of the page
- 5.I. Locate the implementation files. Summarize the screen and/or scenario logic briefly and also note down the name of the key implementation files

7. Create a section 'What to test'. If a specific scenario was provided, put this only. Otherwise, if only a page/view was provided with no scenario, suggest top 5 test cases titles with the format of ('when...then...'). Please read the section 'What to test' in our testing document and also conclude the implementation logic paths. Prioritize meaningul flows like sent-out messages and UI that displays action results(!), deprioritize UI changes that are part of a flow (not the outcome of an action)

Important: for each proposed test, suggest how to simulate its scenario. For example, if some IDE messages are needed, or a local state - tell which and how to trigger this
8. Write One test examples in the file example-test-case.ts. Base your test file on an existing test file under /src/test/\*.test.tsx
9. Ensure the test-plan-report.md has all the sections

## Further notes on the page/view inspection with Playwright MCP

1. Don't logout, navigate away or perform any action that will prevent further exploration of the page
2. Close local webserver when done
3. If you got stuck and can't navigate back, refresh the page

## The test plan report

Create a nice test-plan-report.md report in the working folder. Make it nice, use emojis, and include the following sections:

H1: {Screen name and optionally a scenario name} test plan
H2: Executive summary in one paragraph telling whether the target page/view and all scenarios are testable and whether some blockers exists
H2: Explanation how to reach the target view/screen
H2: Snapshot - a single screenshot image of the screen/view
H2: Key elements table
H2: Working folder path
H2: A list of console errors
H2: Implementation summary and files
H2: Proposed test cases
H2: Key network requests path, and a link to the .har file
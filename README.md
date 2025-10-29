# frontend-testing-setup
Work in progress: how to setup great frontend testing including the infrastructure and tests with great practices inside

Input

URL

Intro: page testing, dev, not E2E, automatically, fast, Vite

Steps

Install
Pin
Hello-world
Package.json scripts
Config:
webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
      name: "chromium",
      testMatch: "**/pages/**/*.test.ts",
      fullyParallel: true,
Example test
GitHub

Test

Confirm
Page URL
tell it a little about the page
describe some scenario

Rules/ii

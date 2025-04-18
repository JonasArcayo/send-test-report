# Send Test Report

A simple utility to send CTRF-style test reports to Slack or Microsoft Teams via webhook. Perfect for CI/CD integrations with Bitbucket, GitHub Actions, and CircleCI.

## Features

- 🚀 Send test reports to Slack or Microsoft Teams
- 📊 Supports CTRF

## Installation

```bash
npm install @testkit/send-test-report
```

## Usage

### CLI Usage

```bash
# Send a test report to Slack
send-test-report --webhook-url "your-slack-webhook-url" \
                 --report-file "path/to/report.json"

# Send a test report to Microsoft Teams
send-test-report --webhook-url "your-teams-webhook-url" \
                 --report-file "path/to/report.json" \
                 --platform teams
```

## Examples

Example integrations are available for:
- [Playwright](./examples/playwright)
- [Cypress](./examples/cypress)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

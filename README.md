# send-test-report

[![npm version](https://img.shields.io/npm/v/send-test-report.svg)](https://www.npmjs.com/package/send-test-report)
[![Build Status](https://github.com/yourusername/test-report-processor/workflows/CI/badge.svg)](https://github.com/yourusername/test-report-processor/actions)
[![Coverage Status](https://coveralls.io/repos/github/yourusername/test-report-processor/badge.svg)](https://coveralls.io/github/yourusername/test-report-processor)

Process and analyze test reports in CTRF format with ease.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Advanced Usage](#advanced-usage)
- [API](#api)
  - [TestReportProcessor](#testreportprocessor)
  - [ReportAnalyzer](#reportanalyzer)
- [Recipes](#recipes)
- [Caveats](#caveats)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install --save-dev send-test-report
```

If you're using TypeScript, add the types to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["send-test-report"]
  }
}
```

## Usage

```bash
npx send-test-report --report "path/to/ctrf-report.json" --webhook $WEBHOOK_URL --notify "slack"
```

## Caveats

- The processor currently supports CTRF format only
- Performance analysis requires detailed timing information in the report
- TypeScript types are included in the package
- Environment variables can override configuration options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

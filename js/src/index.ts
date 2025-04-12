#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { sendWebhook } from './utils/sendWebhook.js';
import { formatSlackMessage } from './formatters/slack.js';
import minimist from 'minimist/index.js';

const argv = minimist(process.argv.slice(2));

if (argv.help) {
	console.log(`
Usage: npx your-package [options]

Options:
  --report         Path to the CTRF JSON report (required)
  --webhook        Webhook URL for your destination (required)
  --ci-provider    Your CI system (bitbucket, github, circleci) [optional]
  --notify         Notification platform (slack, teams) [default: slack]
  --silent         Suppress all logs except errors
  --help           Show this help message
`);
	process.exit(0);
}

const reportPath = argv.report;
const webhookUrl = argv.webhook;
//const ciProvider = argv['ci-provider'] || 'unknown';
const notify = argv.notify || 'slack';
const silent = argv.silent || false;

if (!reportPath || !webhookUrl) {
	console.error('Error: --report and --webhook are required.');
	process.exit(1);
}

(async () => {
	try {
		const absolutePath = path.resolve(reportPath);
		const reportData = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));

		let payload;

		switch (notify.toLowerCase()) {
		case 'slack':
			payload = formatSlackMessage(reportData);
			break;
		default:
			throw new Error(`Unsupported notify platform: ${notify}`);
		}

		await sendWebhook(webhookUrl, payload, notify);

		if (!silent) {
			console.log(`Report sent to ${notify.toUpperCase()} successfully.`);
		}

	} catch (error) {
		console.error(`${error instanceof Error ? error.message : error}`);
		process.exit(1);
	}
})();

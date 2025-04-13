import fs from 'fs';
import path from 'path';
import { CTRFReport } from '../src/types/CTRFReport';
import { formatSlackMessage } from '../src/formatters/slack';

describe('formatSlack', () => {
	it('should return a Slack-compatible message with all fields', () => {
		const reportPath = path.join(__dirname, 'fixtures', 'sample-ctrf-report.json');
		const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8')) as CTRFReport;
		const message = formatSlackMessage(report);
		expect(message).toHaveProperty('blocks');
		expect(message.blocks).toHaveLength(9);
		
		// Check header block
		expect(message.blocks[0]).toHaveProperty('type', 'header');
		expect(message.blocks[0].text.text).toContain('Test Execution Report');
		
		// Check context block
		expect(message.blocks[1]).toHaveProperty('type', 'context');
		expect(message.blocks[1].elements[0].text).toContain('Environment');
		expect(message.blocks[1].elements[1].text).toContain('Pipeline');
		
		// Check summary section
		const statusText = report.results.summary.failed > 0 
            ? '***FAILED PIPELINE***' 
            : '***PASSED PIPELINE***';
        expect(message.blocks[3].text.text).toContain(statusText);
		
		// Check stats section
		expect(message.blocks[4].fields[0].text).toContain('Total tests');
		expect(message.blocks[4].fields[1].text).toContain('Duration');
		
		// Check detailed stats
		expect(message.blocks[5].fields[0].text).toContain('Passed');
		expect(message.blocks[5].fields[1].text).toContain('Skipped');
		expect(message.blocks[5].fields[2].text).toContain('Failed');
		expect(message.blocks[5].fields[3].text).toContain('Pending');
		
		// Check button action
		expect(message.blocks[8].elements[0].text.text).toBe('📑 View Full Report');
		expect(message.blocks[8].elements[0].url).toBe('http://ci.example.com/build/1234');
	});

	it('should handle missing optional fields gracefully', () => {
		const reportPath = path.join(__dirname, 'fixtures', 'sample-ctrf-report.json');
		const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8')) as CTRFReport;

		// Remove optional fields
		delete report.results?.environment?.buildUrl;
		delete report.results?.environment?.testEnvironment;
		const message = formatSlackMessage(report);

		// Context block should take default values
		expect(message.blocks[1].elements[0].text).toBe('*Environment:* Unknown');

		// Button URL should fall back to example.com
		expect(message.blocks[8].elements[0].url).toBe('https://example.com');
	});

	it('should format duration correctly', () => {
		const reportPath = path.join(__dirname, 'fixtures', 'sample-ctrf-report.json');
		const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8')) as CTRFReport;

		// Set specific duration
		report.results.summary.stop = report.results.summary.start + 95;
		
		const message = formatSlackMessage(report);
		
		// Duration should be formatted as 1m 35s
		expect(message.blocks[4].fields[1].text).toContain('1m 35s');
	});

	it('should handle empty report gracefully', () => {
		const emptyReport = {
			results: {
                tool:{
                    name: ''
                },
				summary: {
					tests: 0,
					passed: 0,
					failed: 0,
					pending: 0,
					skipped: 0,
					other: 0,
					start: 0,
					stop: 0
				},
				tests: [],
				environment: {}
			}
		};
		
		const message = formatSlackMessage(emptyReport);
		
		expect(message.blocks[3].text.text).toContain('PASSED PIPELINE');
		expect(message.blocks[4].fields[0].text).toContain('*Total tests:*\n0');
		expect(message.blocks[4].fields[1].text).toContain('*Duration:*\n0m 0s');
	});
});

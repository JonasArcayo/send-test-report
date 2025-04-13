import { CTRFReport } from '../types/CTRFReport';
import { SlackMessage } from '../types/slackMessage';

export function formatSlackMessage(report: CTRFReport): SlackMessage {
	// Calculate duration in minutes and seconds
	const totalSeconds = (report.results.summary.stop - report.results.summary.start) / 1000;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);

	// Update the summary text to reflect whether it's a pass or fail
	const result = report.results.summary.failed > 0 ? '***FAILED PIPELINE***' : '***PASSED PIPELINE***';
	return {
		'blocks': [
			{
				'type': 'header',
				'text': {
					'type': 'plain_text',
					'text': `📊 Test Execution Report: ${report.results.environment?.reportName || 'Unnamed Report'}`,
					'emoji': true
				}
			},
			{
				'type': 'context',
				'elements': [
					{
						'type': 'mrkdwn',
						'text': `*Environment:* ${report.results.environment?.testEnvironment || 'Unknown'}`
					},
					{
						'type': 'mrkdwn',
						'text': `*Pipeline:* <${report.results.environment?.buildUrl || 'Unknown'}|View Build>`
					}
				]
			},
			{
				'type': 'divider'
			},
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text': `*Summary:* ${result}`
				}
			},
			{
				'type': 'section',
				'fields': [
					{
						'type': 'mrkdwn',
						'text': `*Total tests:*\n${report.results.summary.tests}`
					},
					{
						'type': 'mrkdwn',
						'text': `*Duration:*\n${minutes}m ${seconds}s`
					}
				]
			},
			{
				'type': 'section',
				'fields': [
					{
						'type': 'mrkdwn',
						'text': `:white_check_mark: *Passed:*  ${report.results.summary.passed}`
					},
					{
						'type': 'mrkdwn',
						'text': `:fast_forward: *Skipped:*  ${report.results.summary.skipped}`
					},
					{
						'type': 'mrkdwn',
						'text': `:x: *Failed:* ${report.results.summary.failed}`
					},
					{
						'type': 'mrkdwn',
						'text': `:hourglass_flowing_sand: *Pending:* ${report.results.summary.pending}`
					}
				]
			},
			{
				'type': 'divider'
			},
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text': '*Details:* For more information, you can view the detailed test report below.'
				}
			},
			{
				'type': 'actions',
				'elements': [
					{
						'type': 'button',
						'text': {
							'type': 'plain_text',
							'text': '📑 View Full Report',
							'emoji': true
						},
						'url': report.results.environment?.buildUrl || 'https://example.com',
						'style': 'primary'
					}
				]
			}
		]
	};
}

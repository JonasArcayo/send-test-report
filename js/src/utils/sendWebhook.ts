import fetch from 'node-fetch';

export async function sendWebhook(webhookUrl: string, message: object, name: string): Promise<void> {
	if (!webhookUrl) {
		throw new Error(`${name} webhook URL is required.`);
	}

	const response = await fetch(webhookUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(message)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to send ${name} report: ${response.status} ${errorText}`);
	}
}

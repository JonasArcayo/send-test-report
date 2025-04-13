export interface SlackMessage {
	blocks: [
		{
			type: 'header';
			text: {
				type: 'plain_text';
				text: string;
				emoji: boolean;
			};
		},
		{
			type: 'context';
			elements: {
				type: 'mrkdwn';
				text: string;
			}[];
		},
		{
			type: 'divider';
		},
		{
			type: 'section';
			text: {
				type: 'mrkdwn';
				text: string;
			};
		},
		{
			type: 'section';
			fields: [
				{
					'type': 'mrkdwn',
					'text': string;
				},
				{
					'type': 'mrkdwn',
					'text': string;
				}
			];
		},
        {
			type: 'section';
			fields: [
				{
					'type': 'mrkdwn',
					'text': string;
				},
				{
					'type': 'mrkdwn',
					'text': string;
				},
				{
					'type': 'mrkdwn',
					'text': string;
				},
				{
					'type': 'mrkdwn',
					'text': string;
				}
			];
		},
		{
			type: 'divider';
		},
		{
			type: 'section';
			text: {
				type: 'mrkdwn';
				text: string;
			};
		},
		{
			type: 'actions';
			elements: {
				type: 'button';
				text: {
					type: 'plain_text';
					text: string;
					emoji: boolean;
				};
				url: string;
				style: 'primary';
			}[];
		}
	];
}
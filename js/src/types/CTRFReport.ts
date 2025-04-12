/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CTRFReport {
	results: {
		tool: {
			name: string;
			version?: string;
			extra?: Record<string, any>;
		};
		summary: {
			tests: number;
			passed: number;
			failed: number;
			pending: number;
			skipped: number;
			other: number;
			suites?: number;
			start: number;
			stop: number;
			extra?: Record<string, any>;
		};
		tests: CTRFTestCase[];
		environment?: {
			reportName?: string;
			appName?: string;
			appVersion?: string;
			buildName?: string;
			buildNumber?: string;
			buildUrl?: string;
			repositoryName?: string;
			repositoryUrl?: string;
			commit?: string;
			branchName?: string;
			osPlatform?: string;
			osRelease?: string;
			osVersion?: string;
			testEnvironment?: string;
			extra?: Record<string, any>;
		};
		extra?: Record<string, any>;
	};
}

export interface CTRFTestCase {
	name: string;
	status: 'passed' | 'failed' | 'skipped' | 'pending' | 'other';
	duration: number;
	start?: number;
	stop?: number;
	suite?: string;
	message?: string;
	trace?: string;
	line?: number;
	ai?: number;
	rawStatus?: string;
	tags?: string[];
	type?: string;
	filePath?: string;
	retries?: number;
	flaky?: boolean;
	stdout?: string;
	stderr?: string;
	browser?: string;
	device?: string;
	screenshot?: string;
	parameters?: Record<string, any>;
	steps?: {
		name?: string;
		status?: 'passed' | 'failed' | 'skipped' | 'pending' | 'other';
		extra?: Record<string, any>;
	};
	attachments?: string[];
	extra?: Record<string, any>;
}

const { defineConfig } = require("cypress");
const { GenerateCtrfReport } = require('cypress-ctrf-json-reporter');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			new GenerateCtrfReport({
				on,
				outputFile: 'ctrf-report.json',
				outputDir: 'results',
				appName: 'MyApp',
				testEnvironment: 'staging',
				buildUrl: 'https://ctrf.io' // BUILD_URL for Jenkins/Bitbucket/GitLab/GitHub/CircleCI
			})
		},
	},
});

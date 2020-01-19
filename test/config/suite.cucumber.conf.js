const { HtmlReporter } = require("@rpii/wdio-html-reporter");
const { TimelineService } = require("wdio-timeline-reporter/timeline-service");
const path = require("path");
const moment = require("moment");

//to use debug option run `DEBUG=true followed by your .conf.js`
// const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 90000;

exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: "local",

  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `WebdriverIO` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //

  specs: ["./test/features/*.feature"],
  suites: {
    testPlayer: ["./test/features/testPlayer.feature"]
  },

  // Patterns to exclude.
  exclude: [
    // './test/specs/file-to-exclude.js'
  ],

  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 15,

  capabilities: [
    {
      // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      // grid with only 5 Chrome instances available you can make sure that not more than
      // 5 instances get started at a time.
      maxInstances: 1,
      browserName: "chrome",
      "goog:chromeOptions": {
        // to run chrome headless the following flags are required
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)

        //with gui
        args: ["start-maximized", "no-sandbox"]

        //headless
        // args: ['--headless', '--disable-gpu', 'start-maximized', 'no-sandbox'],
      }
    }   
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  logLevel: "info", // Level of logging verbosity: trace | debug | info | warn | error | silent
  // Warns when a deprecated command is used
  deprecationWarnings: true,

  // Set directory to store all logs into
  outputDir: __dirname,
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  baseUrl: "https://www.sbs.com.au/",

  waitforTimeout: 600000, // Default timeout for all waitFor* commands.
  connectionRetryTimeout: 90000, // Default timeout in milliseconds for request if Selenium Grid doesn't send response
  connectionRetryCount: 5, // Default request retries count

  services: [['selenium-standalone'], [HtmlReporter], [TimelineService], ['devtools'], ['docker']],

  // services: [browserstack'],
  // user: process.env.BROWSERSTACK_USERNAME,
  // key: process.env.BROWSERSTACK_ACCESS_KEY,
  // browserstackLocal: true,

  framework: "cucumber",

  coloredLogs: true,

  reporters: [
    [
      "timeline",
      {
        outputDir: "./test/reports/timeline-report/",
        fileName: "timeline-report.html",
        embedImages: true,
        images: {
          quality: 80,
          resize: false,
          reductionRatio: 2
        },
        screenshotStrategy: "before:click" //on:error, before:click, none
      }
    ]
  ],

  cucumberOpts: {
    require: ["./test/stepDefinitions/*.steps.js"], // <string[]> (file/dir) require files before executing features
    backtrace: false, // <boolean> show full backtrace for errors
    requireModule: ["@babel/register"], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    format: ["pretty"], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true, // <boolean> disable colors in formatter output
    snippets: false, // <boolean> hide step definition snippets for pending steps
    source: true, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: false, // <boolean> fail if there are any undefined or pending steps
    timeout: 600000, // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false // <boolean> Enable this config to treat undefined definitions as warnings.
  },

  //
  // =====
  // Hooks
  // =====
  // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  //   console.log('**** let\'s go ****');
  //   let reportAggregator = new ReportAggregator({
  //     outputDir: './reports/html-reports/',
  //     filename: 'master-report.html',
  //     reportTitle: 'Master Report'
  //   });
  //   reportAggregator.clean();

  //   global.reportAggregator = reportAggregator;
  // },

  // onPrepare: function (config, capabilities) {

  //   let reportAggregator = new ReportAggregator({
  //     outputDir: './test/reports/html-reports/',
  //     filename: 'refinance-report.html',
  //     reportTitle: 'Refinance Test Report'
  //   });
  //   reportAggregator.clean();

  //   global.reportAggregator = reportAggregator;
  // },

  // onComplete: function (exitCode, config, capabilities, results) {
  //   (async () => {
  //     await global.reportAggregator.createReport({
  //       config: config,
  //       capabilities: capabilities,
  //       results: results
  //     });
  //   })();
  // },

  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function(config, capabilities, specs) {
    require("@babel/register");
  },
  /**
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    * @param {Array.<Object>} capabilities list of capabilities details
    * @param {Array.<String>} specs List of spec file paths that are to be run
    */
  before: function(capabilities, specs) {
    /**
     * Setup the Chai assertion framework
     */
    const chai = require("chai");
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
  //
  // Hook that gets executed before the suite starts
  // beforeSuite: function (suite) {
  // },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeHook: function (each) {
  // },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  // afterHook: function (currentTest) {
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // beforeTest: function (test) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  // afterTest: function (test) {
  // },

  // afterTest: function (test) {
  //   const path = require('path');
  //   const moment = require('moment');

  //   // if test passed, ignore, else take and save screenshot.
  //   if (test.passed) {
  //     return;
  //   }
  //   const timestamp = moment().format('YYYYMMDD-HHmmss.SSS');
  //   const filepath = path.join(__dirname + '../reports/html-reports/screenshots/', timestamp + '.png');
  //   browser.saveScreenshot(filepath);
  //   process.emit('test:screenshot', filepath);
  // },

  // if (test.passed === false) {
  //   takeScreenshotPath('../screenshots/', 'screenshot_fail.png');
  // }
  // },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. It is not
   * possible to defer the end of the process using a promise.
   * @param {Object} exitCode 0 - success, 1 - fail
   */
  // onComplete: function (exitCode, config, capabilities, results) {
  //   console.log('**** that\'s it ****');
  //   (async () => {
  //     await global.reportAggregator.createReport({
  //       config: config,
  //       capabilities: capabilities,
  //       results: results
  //     });
  //   })();

  // },
  onReload: function(oldSessionId, newSessionId) {},
  /**
   * Cucumber specific hooks
   */
  beforeFeature: function(uri, feature, scenarios) {},
  beforeScenario: function(uri, feature, scenario, sourceLocation) {},
  beforeStep: function(uri, feature) {},
  afterStep: function(uri, feature, { error, result }) {
    if (error !== undefined) {
      const timestamp = moment().format("YYYYMMDD-HHmmss.SSS");
      const filepath = path.join(
        __dirname,
        "../reports/html-reports/screenshots/",
        timestamp + ".png"
      );
      browser.saveScreenshot(filepath);
      process.emit("test:screenshot", filepath);
    }
  },
  afterScenario: function(uri, feature, scenario, result, sourceLocation) {
    // console.log("scenario is ==>", scenario);
    //required when you have more examples test data to reload the page with new session id
    // browser.reloadSession()
  },
  afterFeature: function(uri, feature, scenarios) {
    browser.closeWindow();

    // generation.on('exit', function (exitCode) {
    //   console.log('Generation is finished with code:', exitCode);
    // });
  }
};

// Karma configuration
// Generated on Thu Jun 20 2019 13:02:13 GMT+0300 (Moscow Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [ 'src/**/*.js', 'tests/**/*.spec.js' ],


    // list of files / patterns to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': [ 'webpack', 'sourcemap', 'coverage' ],
      'tests/**/*.spec.js': ['webpack'],
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html',

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'mocha',
      'progress',
      'coverage',
      'remap-coverage',
    ],

    coverageReporter: { type: 'in-memory' },

    // coverageReporter: {
    //   // cf. http://gotwarlost.github.com/istanbul/public/apidocs/
    //   type: 'html',
    //   dir: 'coverage/',
    // },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    webpack: require('./webpack-karma.config.js'),


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-remap-coverage',
    ],
  });
};

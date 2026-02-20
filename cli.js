#!/usr/bin/env node

const { parseArgs } = require('node:util');
const chalk = require('chalk');
const ora = require('ora');

const pkg = require('./package.json');
const main = require('./lib');
const print = require('./lib/print');

const HELP_TEXT = `
  Query abbreviation in your command line.

  Usage:
    sx <words>

  Options:
    -v, --version   Output version number (v${pkg.version} now)
    -h, --help      Output usage information
`;

function showHelp(exitCode) {
  console.log(HELP_TEXT);
  process.exit(exitCode);
}

const { values, positionals } = parseArgs({
  options: {
    help: {
      type: 'boolean',
      short: 'h',
    },
    version: {
      type: 'boolean',
      short: 'v',
    },
  },
  allowPositionals: true,
  strict: false,
});

if (values.version) {
  console.log(pkg.version);
  process.exit(0);
}

if (values.help) {
  showHelp(0);
}

const word = positionals.join(' ');
if (!word) {
  showHelp(2);
}

const spinner = ora('Loading...').start();

main(word)
  .then((rst) => {
    spinner.stop();
    if (rst?.results?.result) {
      print(rst.results.result);
    } else {
      console.log(chalk.red("We couldn't find any results for your search."));
      console.log(
        `Or you can search it online: ${chalk.gray.underline(
          `http://www.abbreviations.com/abbreviation/${encodeURIComponent(word)}`,
        )}`,
      );
    }
  })
  .catch((e) => {
    spinner.stop();
    process.env.NODE_ENV !== 'development'
      ? console.log(chalk.red('Ah, it seems to be something wrong.'))
      : console.error(e.stack);
  });

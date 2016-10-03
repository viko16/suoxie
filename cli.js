#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const ora = require('ora')

const pkg = require('./package.json')
const main = require('./lib')
const print = require('./lib/print')

updateNotifier({ pkg }).notify()

const cli = meow(`
  Usage:
    sx <words>

  Options:
    -v, --version   Output version number (v${pkg.version} now)
    -h, --help      Output usage information
`, {
  alias: {
    h: 'help',
    v: 'version'
  }
})

const word = cli.input.join(' ')
if (!word) cli.showHelp()

const spinner = ora('Loading...').start()

main(word)
  .then(rst => {
    spinner.stop()
    if (rst && rst.results && rst.results.result) {
      print(rst.results.result)
    } else {
      console.log('We couldn\'t find any results for your search.')
      console.log('Or you can search it online: ' + chalk.gray.underline(`http://www.abbreviations.com/abbreviation/${encodeURIComponent(word)}`))
    }
  })
  .catch(e => {
    spinner.stop()
    process.env.NODE_ENV !== 'development'
      ? console.log('Ah, it seems to be something wrong.')
      : console.error(e.stack)
  })

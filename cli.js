#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const chalk = require('chalk')

const pkg = require('./package.json')
const main = require('./lib')
const print = require('./lib/print')

updateNotifier({ pkg }).notify()

const cli = meow(`
  Usage:
    sx <words>

  Options:
    -v, --version   Output version number
    -h, --help      Output usage information
`, {
  alias: {
    h: 'help',
    v: 'version'
  }
})

const word = cli.input.join(' ')
if (!word) cli.showHelp()

main(word)
  .then(rst => {
    if (rst && rst.results && rst.results.result) {
      print(rst.results.result)
    } else {
      console.log('We couldn\'t find any results for your search.')
      console.log('Or you can search it online: ' + chalk.gray.underline(`http://www.abbreviations.com/abbreviation/${encodeURIComponent(word)}`))
    }
  })
  .catch(e => {
    process.env.NODE_ENV === 'production'
      ? console.log('Ah, it seems to be something wrong.')
      : console.error(e.stack)
  })

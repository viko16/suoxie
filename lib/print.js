'use strict'

const chalk = require('chalk')

module.exports = function (arr) {
  console.log()
  arr.forEach((el, index) => {
    let output = [
      chalk.green(index + 1 + '.'),
      chalk.yellow(el.term),
      '» ' + el.categoryname,
      (typeof el.parentcategoryname === 'string') ? ('» ' + el.parentcategoryname) : null,
      chalk.magenta('★ ' + el.score)
    ]
    console.log(output.join(' '))

    console.log(chalk.gray.underline(`http://www.abbreviations.com/term/${el.id}`))
    console.log()
  })
}

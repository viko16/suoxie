const chalk = require('chalk');

function printResults(results) {
  if (!results) {
    return;
  }

  const items = Array.isArray(results) ? results : [results];

  console.log();
  items.forEach((el, index) => {
    const output = [
      chalk.green(`${index + 1}.`),
      chalk.yellow(el.term),
      `» ${el.categoryname}`,
      typeof el.parentcategoryname === 'string' ? `» ${el.parentcategoryname}` : null,
      chalk.magenta(`★ ${el.score}`),
    ];
    console.log(output.join(' '));

    console.log(chalk.gray.underline(`http://www.abbreviations.com/term/${el.id}`));
    console.log();
  });
}

module.exports = printResults;

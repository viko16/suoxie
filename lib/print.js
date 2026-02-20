const chalk = require('chalk');

function isArray(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

module.exports = (arr) => {
  if (!arr) return;

  if (!isArray(arr)) arr = [arr];

  console.log();
  arr.forEach((el, index) => {
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
};

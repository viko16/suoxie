const { styleText } = require('node:util');

function printResults(results) {
  if (!results) {
    return;
  }

  const items = Array.isArray(results) ? results : [results];

  console.log();
  items.forEach((el, index) => {
    const output = [
      styleText('green', `${index + 1}.`),
      styleText('yellow', el.term),
      `» ${el.categoryname}`,
      typeof el.parentcategoryname === 'string' ? `» ${el.parentcategoryname}` : null,
      styleText('magenta', `★ ${el.score}`),
    ];
    console.log(output.join(' '));

    console.log(styleText(['gray', 'underline'], `https://www.abbreviations.com/term/${el.id}`));
    console.log();
  });
}

module.exports = printResults;

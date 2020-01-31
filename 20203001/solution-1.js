const fs = require('fs');
const path = require('path');
const R = require('ramda');

const reader = require('../reader');

module.exports = function() {
  let stream;
  try {
    stream = fs.createWriteStream(__dirname + '/out', { flags: 'w' });
    const lines = reader(__dirname + '/in');

    for (let i = 0; i < lines.length; i++) {
      const numbers = lines[i].split(/\s/);
      const product = R.product(numbers);

      const result = R.map(function(n) {
        return product / n;
      }, numbers);
      stream.write(`${result}\n`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    stream && stream.end();
  }
};

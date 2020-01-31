const fs = require('fs');
const path = require('path');

const reader = require('../reader');

function addup(array, k) {
  const object = array.reduce(function(object, number) {
    return Object.assign(object, { [number]: true });
  }, {});

  let found = false;
  for (let i = 0; i < array.length && !found; i++) {
    const number = array[i];
    const diff = Math.abs(number - k);

    if (object[diff]) {
      found = true;
    }
  }

  return found;
}

module.exports = function() {
  let stream;
  try {
    stream = fs.createWriteStream(__dirname + '/out', { flags: 'a' });
    const lines = reader(__dirname + '/in');

    for (let i = 0; i < lines.length; i++) {
      const numbers = lines[i].split(/\s/);
      i++;
      const sum = lines[i];

      const result = addup(numbers, sum);
      stream.write(`${result}\n`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    stream && stream.end();
  }
};

const fs = require('fs');
const path = require('path');

module.exports = function(path) {
  try {
    // read contents of the file
    const data = fs.readFileSync(path, 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    return lines;
  } catch (err) {
    console.error(err);
  }

  return [];
};

import fs from 'fs';
import path from 'path';

import * as R from 'ramda';

import reader from '../reader';

const matrix = {
  init: size => {
    const rows = Array(size);

    for (let i = 0; i < size; i++) {
      rows[i] = Array(size);
    }

    return rows;
  }
};

export default () => {
  let stream;

  try {
    stream = fs.createWriteStream(__dirname + '/out', { flags: 'w' });
    const lines = reader(__dirname + '/in');

    for (let i = 0; i < lines.length; i++) {
      const numbers = lines[i].split(/\s/);
      const m = matrix.init(numbers.length);

      const multiply = (from, to) => {
        if (to < from) {
          return 1;
        }

        return m[from][to];
      };

      for (let j = 0; j < numbers.length; j++) {
        m[j][j] = numbers[j];

        for (let k = j + 1; k < numbers.length; k++) {
          const product = m[j][k - 1] * numbers[k];
          m[j][k] = product;
          m[k][j] = product;
        }
      }

      const products = [];
      const length = numbers.length;
      for (let j = 0; j < length; j++) {
        products[j] = multiply(0, j - 1) * multiply(j + 1, length - 1);
      }

      stream.write(`${products}\n`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    stream && stream.end();
  }
};

/* eslint-env mocha, es6 */

let mdAST = require('../');
let assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

function eq(o, refpath) {
  const ref =  JSON.parse(fs.readFileSync(path.join(__dirname, refpath), 'utf8'));

  try {
    let a = JSON.parse(JSON.stringify(o));
    assert.deepEqual(a, ref);
  } catch (ex) {
    console.error(ex.message,
      '\n---- IST -----------------------------------------------------\n',
      JSON.stringify(o, null, 4),
      '\n---- VS. SOLL -----------------------------------------------------\n',
      JSON.stringify(ref, null, 4),
      '\n---- END -----------------------------------------------------\n');
    throw ex;
  }
}

describe('markdown-it-ast', function () {
  it('produces an AST', function () {
    let md = require('@gerhobbelt/markdown-it')({ linkify: true });

    let tokens = md.parse('#123\n##456');
    eq(mdAST.makeAST(tokens), 'reference/ast1.json');
  });
});

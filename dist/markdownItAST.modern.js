/*! markdown-it-ast 0.0.1-3 https://github.com//GerHobbelt/markdown-it-ast @license MIT */

function markdownItAST(tokens) {
  function genTreeNode(node) {
    return {
      nodeType: node && node.type.replace('_open', ''),
      openNode: node,
      closeNode: null,
      children: []
    };
  } // dummy root node


  let rootNode = genTreeNode(null);
  let curr = rootNode;
  let stack = [];
  tokens.forEach(function (tok, idx) {
    let tmp;

    if (tok.nesting === 1) {
      tmp = genTreeNode(tok);
      curr.children.push(tmp);
      stack.push(curr);
      curr = tmp;
    } else if (tok.nesting === -1) {
      curr.closeNode = tok;
      if (!stack.length) throw new Error('AST stack underflow.');
      tmp = stack.pop(); // TODO: check whether the close node corresponds to the one it opens
      // curr = stack[stack.length - 1];

      curr = tmp;
    } else if (tok.nesting === 0) {
      curr.children.push(tok);
    } else {
      throw new Error('Invalid nesting level found in token index ' + idx + '.');
    }
  });

  if (stack.length !== 0) {
    throw new Error('Unbalanced block open/close tokens.');
  }

  return rootNode.children;
}

module.exports = {
  makeAST: markdownItAST
};
//# sourceMappingURL=markdownItAST.modern.js.map

/*! markdown-it-ast 0.0.1-1 https://github.com//GerHobbelt/markdown-it-ast @license MIT */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitAst = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

'use strict';


function markdownItAST(tokens) {
  function genTreeNode(node) {
    return {
      nodeType: node && node.type.replace('_open', ''),
      openNode: node,
      closeNode: null,
      children: []
    };
  }

    // dummy root node
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
      tmp = stack.pop();
            // TODO: check whether the close node corresponds to the one it opens
            // curr = stack[stack.length - 1];
      curr = tmp;
    } else if (tok.nesting === 0) {
      curr.children.push(tok);
    } else {
      throw new Error('Invalid nesting level found in token index ' + idx + '.');
    }
  });

  if (stack.length !== 0) { throw new Error('Unbalanced block open/close tokens.'); }

  return rootNode.children;
}

module.exports = {
  makeAST: markdownItAST
};

},{}]},{},[1])(1)
});

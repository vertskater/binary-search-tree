"use strict";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  /**
   *
   * @param {Array} data
   */
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    //sort the array
    if (arr.length > 2) arr.sort((a, b) => a - b);
    //TODO: find a better way to delete duplicate numbers
    /* arr = arr.filter((item, index) => {
      return item !== arr[index + 1];
    }); */

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return (this.root = node);
  }
  //insert new Data
  insert(value) {
    const check = (node) => {
      if (node.data === value) return;
      if (node.data > value) {
        check((node.left = node.left || new Node(value)));
      }
      if (node.data < value) {
        check((node.right = node.right || new Node(value)));
      }
    };
    check((this.root = this.root || new Node(value)));
  }
  delete(value) {
    const deleteKey = (node, value) => {
      if (!node) return null;
      if (value === node.data) {
        //base case
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let temp = node.right;
        while (temp.left) {
          temp = temp.left;
        }
        node.data = temp.data;
        node.right = deleteKey(node.right, temp.data);
        return node;
      } else if (value < node.data) {
        node.left = deleteKey(node.left, value);
        return node;
      } else {
        node.right = deleteKey(node.right, value);
        return node;
      }
    };
    this.root = deleteKey(this.root, value);
  }
  find(value) {
    const search = (node, value) => {
      if (node === null) return null;
      if (node.data === value) return node;
      return search(node.left, value) ?? search(node.right, value);
    };
    return search(this.root, value);
  }
  levelOrder() {
    let queue = [];
    let result = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      result.push(curr.data);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return result;
  }
  inOrder() {
    const nodes = [];
    const inOrderSearch = (root) => {
      if (root.left) inOrderSearch(root.left);
      nodes.push(root.data);
      if (root.right) inOrderSearch(root.right);
    };
    inOrderSearch(this.root);
    return nodes;
  }
  preOrder() {
    const nodes = [];
    const preOrderSearch = (root) => {
      nodes.push(root.data);
      if (root.left) preOrderSearch(root.left);
      if (root.right) preOrderSearch(root.right);
    };
    preOrderSearch(this.root);
    return nodes;
  }
  postOrder() {
    const nodes = [];
    const postOrderSearch = (root) => {
      if (root.left) postOrderSearch(root.left);
      if (root.right) postOrderSearch(root.right);
      nodes.push(root.data);
    };
    postOrderSearch(this.root);
    return nodes;
  }
  height(node) {
    if (node === null) return 0;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node) {
    if (node === null) return 0;
    let dist = -1;
    if (
      (dist = this.depth(node.left)) >= 0 ||
      (dist = this.depth(node.right)) >= 0
    ) {
      return dist + 1;
    }
    return dist;
  }
  isBalanced(root) {
    if (root === null) return true;
    let left = this.height(root.left);
    let right = this.height(root.right);
    if (
      Math.abs(left - right) <= 1 &&
      this.isBalanced(root.left) === true &&
      this.isBalanced(root.right) === true
    ) {
      return true;
    }
    return false;
  }
  reBalance(root) {
    if (this.isBalanced(root) === false) {
      let data = this.levelOrder();
      root = this.buildTree(data);
      return root;
    }
  }
}

//helper function for printing the tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const bt = new Tree();
bt.buildTree([1, 10, 9, 3, 5, 8, 7, 6, 4]);
console.log(bt.isBalanced(bt.root));
console.log(bt.levelOrder());
console.log(bt.inOrder());
console.log(bt.preOrder());
console.log(bt.postOrder());
bt.insert(200);
bt.insert(300);
bt.insert(400);
bt.insert(500);
bt.insert(600);
console.log(bt.isBalanced(bt.root));
bt.reBalance(bt.root);
console.log(bt.isBalanced(bt.root));

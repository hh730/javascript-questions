Array.prototype.myFlat = function (depth = Infinity) {
  const flattened = [];
  function flatten(arr, currentDepth) {
    arr.forEach((element) => {
      if (Array.isArray(element) && currentDepth < depth) {
        flatten(element, currentDepth + 1);
      } else {
        flattened.push(element);
      }
    });
  }
  flatten(this, 0);
  return flattened;
};

let nestedArray = [
  [1, 2, 3],
  [4, 5, [6, 7, [8, 9, [10]]]],
  [7, 8, 9],
];
console.log(nestedArray.myFlat(2));

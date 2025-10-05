function multiply(x, y) {
  return function (z) {
    return x * z + y * z + z;
  };
}

console.log(multiply(2, 3)(5));

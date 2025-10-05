function sum(val) {
  if (val == 0) return 0;
  else return val + sum(val - 1);
}

console.log(sum(4));

function getCounter(min, max) {
  let current = min - 1;
  return function count() {
    if (current < max) {
      current++;
      return current;
    } else {
      return undefined;
    }
  };
}

const counter = getCounter(5, 7);
for (i = 0; i < 5; i++) {
  console.log(counter());
}

const arr = [
  { x: 4, y: 2 },
  { x: 1, y: 8 },
  { x: 4, y: 2 },
];

function countavg(arr, key) {
  const avg = arr.reduce((acc, current) => {
    const sum = acc + current[key];
    return sum;
  }, 0);

  return avg / arr.length;
}

console.log(countavg(arr, "x"));

const arr1 = [1, 3, 6, 2, 9];

const indextable = arr1.reduce((acc, current, index) => {
  acc.push(`${index} : ${current}`);
  return acc;
}, []);

console.log(indextable);

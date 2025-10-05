const arr1 = ["Ala", "Janusz", "kot", "pies"];
const arr2 = [1, 112, 13, 18];

const longestvalue = arr2.reduce((longest, currentValue) =>
  longest.toString().length > currentValue.toString().length
    ? longest
    : currentValue
);

console.log(longestvalue);

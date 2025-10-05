const _ = require("lodash");

function filterObjects(array, criteria, partialMatch) {
  const matchobj = _.filter(array, function (e) {
    if (!partialMatch) {
      return _.isMatch(e, criteria);
    } else {
      return _.isMatchWith(e, criteria, function (eVal, cVal) {
        return _.includes(eVal.toString(), cVal.toString());
      });
    }
  });
  return matchobj;
}

const array = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Alice", age: 25 },
  { id: 3, name: "Bob", age: 35 },
  { id: 4, name: "Jacob", age: 31 },
  { id: 5, name: "Alice", age: 20 },
  { id: 6, name: "Natalie", age: 33 },
];
const criteria = { age: 3, name: "Jo" };
console.log(filterObjects(array, criteria, true));

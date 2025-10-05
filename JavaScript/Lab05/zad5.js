const shoppingList = require("./shoppingList.js").shoppingList;

// A
const sorted = shoppingList.reduce((acc, current) => {
  if (!acc[current.type]) {
    acc[current.type] = {};
  }

  acc[current.type][current.product] = {
    quantity: current.quantity,
    price: current.price,
    unit: current.unit,
  };

  return acc;
}, {});

// B
const stringlist = shoppingList.reduce((acc, current) => {
  if (!acc.includes(current.type)) {
    acc += current.type + ":\n";
    let counter = 1;
    for (let i = 0; i < shoppingList.length; i++) {
      if (shoppingList[i].type === current.type) {
        acc += counter + ". " + shoppingList[i].product + "\n";
        counter++;
      }
    }
  }
  return acc;
}, "");

// console.log(sorted);
console.log(stringlist);

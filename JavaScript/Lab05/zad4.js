const wishlist = [
  { name: "Kettle", netto: 100 },
  { name: "Fridge", netto: 2730 },
  { name: "Microwave", netto: 940 },
  { name: "Mixer", netto: 120 },
  { name: "Oven", netto: 3100 },
  { name: "Dishwasher", netto: 2400 },
  { name: "Toaster", netto: 260 },
];

// A

const prices = wishlist.reduce((acc, current) => {
  acc.push(current.netto);
  return acc;
}, []);

console.log(prices);
// B

function stringTable(table) {
  const stringtable = table.reduce((acc, current) => {
    acc.push(`${current.name} : ${current.netto}`);
    return acc;
  }, []);
  return stringtable;
}

console.log(stringTable(wishlist));
// C

function cheaperTable(table) {
  const stringtable = table.reduce((acc, current) => {
    current.netto < 500 ? acc.push(current) : acc;
    return acc;
  }, []);
  return stringtable;
}

console.log(cheaperTable(wishlist));

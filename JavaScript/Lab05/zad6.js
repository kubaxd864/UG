const personlist = require("./potter.js").hogwardArray;

const sorted = personlist.reduce((acc, current) => {
  const houseKey = current.house || "noHouse";

  if (!acc[houseKey]) {
    acc[houseKey] = {};
  }

  if (current.hogwartsStudent) {
    if (!acc[houseKey]["students"]) {
      acc[houseKey]["students"] = [current.name];
    } else {
      acc[houseKey]["students"].push(current.name);
    }
  } else if (current.hogwartsStaff) {
    if (!acc[houseKey]["staff"]) {
      acc[houseKey]["staff"] = [current.name];
    } else {
      acc[houseKey]["staff"].push(current.name);
    }
  } else if (!current.hogwartsStudent && !current.hogwartsStaff) {
    acc[houseKey]["none"] = [current.name];
  }

  return acc;
}, {});

console.log(sorted);

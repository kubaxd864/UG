function isAnyEven(table){
    return table.some((e) => e % 2 == 0)
}

console.log(isAnyEven([1, 4, 3, 5]))
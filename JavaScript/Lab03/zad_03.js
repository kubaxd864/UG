function numberSplit(number) {
    let firstnum = Math.floor(number / 2);
    let secondnum = number - firstnum
    return [firstnum, secondnum]
}

console.log(numberSplit(-9))
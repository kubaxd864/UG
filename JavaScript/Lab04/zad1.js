const arr = [10, 'a', 21, true, null, undefined, 1, false, 'b', 2];

function find_null(table) {
    return table.some((e) => e === null)
}

function find(table) {
    return table.find((e) => typeof(e) === "string")
}

function index(table) {
    return table.findIndex((e) => e === true)
}

function sort_numbers(table) {
    return table.filter((e) => typeof(e) === "number").sort((a,b) => a - b)
}

console.log(find_null(arr))
console.log(find(arr))
console.log(index(arr))
console.log(sort_numbers(arr))

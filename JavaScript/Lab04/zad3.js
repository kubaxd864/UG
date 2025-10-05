function funk1() {
    const val1 = 8
    return function(val2) {
        return val1 + val2
    }
}

console.log(funk1()(8))
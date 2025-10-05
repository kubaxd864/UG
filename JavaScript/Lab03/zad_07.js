function sortWords(table){
    return table.sort((a, b) => {
        if (a.length === b.length) {
            return a.localeCompare(b);
        }
        return a.length - b.length;
    });
}

console.log(sortWords(['pies', 'kot', 'rat', 'chomik', 'królik', 'wiewiórka']))
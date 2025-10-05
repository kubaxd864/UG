let table = [1, 5, 6, 5, 5, 1, 5]
let checked_values = []
let count = 0
for(i = 0; i < table.length; i++){
    if(checked_values.includes(table[i])){
        
    } else {
        value = table[i]
        for(j = 0; j < table.length; j++){
            if(value == table[j]){
                count++
            }
        }
        console.log(value, 'występuje', count == 1 ? 'raz' : 'razy')
        checked_values.push(value)
        count = 0
    }
}

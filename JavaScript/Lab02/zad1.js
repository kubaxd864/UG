'use strict';

const numbers = [4, 3, 5, 1, 3, 2, 21, 1, 65, -43, 9];
const uniq = []

for(let i=0;i<numbers.length;i++){
    if(uniq.includes(numbers[i])){
    } else{
        uniq.push(numbers[i])
    }
}
console.log(uniq)
'use strict';

const testArray = [1, 2, null, [4, undefined, 11, 10], 6, [7, null, 0], null, 9];
const testArray2 = []
for(let i = 0; i < testArray.length; i++){
    if(typeof testArray[i] == 'number' || testArray[i] == null){
        testArray2.push(testArray[i])
    } else{
        let index = testArray.indexOf(testArray[i])
        for(let j=0;j<testArray[i].length;j++){
            testArray2.push(testArray[i][j])
        }
    }
}
console.log(testArray2)
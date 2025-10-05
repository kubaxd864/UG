'use strict';
const person1 = {
    name: 'Agata',
    age: 21
}

const person2 = {
    name: 'Tomasz',
    age: 25
}

const person3 = {
    name: 'Alicja',
    age: 31
}

const person4 = {
    name: 'Jan',
    age: 20
}

const table = [person1, person2, person3, person4]
let age = 0
let average = 0 
for(let i=0;i< table.length;i++){
    age += table[i].age
    average += table[i].age
}
console.log(age, average / table.length)
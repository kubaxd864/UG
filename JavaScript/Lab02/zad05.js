'use strict';
const cat = {
    name: 'Filemon',
    age: 6
}
cat.description = "Kot ma na imię " +  cat.name + " i ma " + cat.age + " lat"
cat.breed = 'Kot Brytyjski'
cat.colour = 'Niebieski'
cat.description = "Kot ma na imię " +  cat.name + " i ma " + cat.age + " lat jest rasy " + cat.breed + " i ma kolor " + cat.colour
console.log(cat.description)
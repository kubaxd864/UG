const persons = [
    { name: 'Jan', age: 22 },
    { name: 'Grzegorz', age: 19 },
    { name: 'Halina', age: null },
    { name: 'Agata', age: 24 },
    { name: 'Krzysztof', age: 40 },
    { name: 'Adam', age: 29 }
]

function sortPersons(obj){
    const names = []
    const agecheck = obj.filter(person => person.age != null);
    const sorted = agecheck.sort((a, b) => a.age - b.age);
    sorted.forEach((e) => names.push(e.name))
    return names
}

console.log(sortPersons(persons))
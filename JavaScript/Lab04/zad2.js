const persons = [
    { id: 1, firstName: 'Adam', lastName: 'Nowak' },
    { id: 2, firstName: 'Kamil', lastName: 'Kowalski' },
    { id: 3, firstName: 'Anna', lastName: 'Mazur' },
    { id: 4, firstName: 'Katarzyna', lastName: 'Maj' },
    { id: 5, firstName: 'Jakub', lastName: 'Adamski' }
]

function new_table(table){
    return table.map(person => ({label: person.firstName + " " + person.lastName, value: person}))
}

console.log(new_table(persons))

// Funkcja forEach służy do operacji na elementach istniejącej tablicy natomiast map tworzy nowa tablicę w której wykonuje zadane działanie
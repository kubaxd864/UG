let tablica = [1, 3, 4, -5, 7, -10, 2, 6]
for(i = 0; i < tablica.length; i++){
    console.log(tablica[i]);
}
let newtable = tablica.sort();
console.log("Wartość minimalna wynosi:", newtable[0]);
console.log("Wartość maksymalna wynosi:", newtable[tablica.length - 1]);
console.log("Odwrócona tablica:", tablica.reverse());
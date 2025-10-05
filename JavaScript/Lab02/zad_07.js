"use strict";

// Poniższe fragmenty kodu zostały zakomentowane w celu utrzymania porządku.
// Odkomentowuj je na bieżąco i zapisuj odpowiedzi w komentarzu.
// Ostatecznie przed wrzuceniem pliku na repozytorium zakomentowane powinny być tylko dodane odpowiedzi i fragmenty kodu powodujące ewentualne błędy.

// ========================= Zadanie 1 =========================
// Co wypisze funkcja dla każdego z poniższych przypadków?
// Wyjaśnij, dlaczego w niektórych przypadkach wyniki różnią się.

// ========================== UWAGA =============================
// Zapis
// (impression) ? console.log('A') : console.log('B');
// Jest skróconą wersją:
// if (impression) {
//     console.log('A');
// } else {
//     console.log('B');
// }
// ==============================================================

function isEquals(val1, val2) {
  val1 == val2 ? console.log("A") : console.log("B");
  val1 === val2 ? console.log("C") : console.log("D");
}

// isEquals(2, '2'); // poniważ nie jest sprawdzany typ zmiennej A, D
// isEquals(null, undefined); // poniważ nie jest sprawdzany typ zmiennej A, D
// isEquals(undefined, NaN); // B, D
// isEquals(['a', 'b', 'c'], ['b', 'c', 'd']); // B, D
// isEquals(0, ''); // poniważ nie jest sprawdzany typ zmiennej A, D
// isEquals('0', ''); //STRINGI SĄ RÓŻNE B, D
// isEquals(+0, -0); // == NIE SPRAWDZAJĄ ZNAKU PRZED CYFRĄ 
// isEquals(0, false); // poniważ js przekształca false na 0 A, D
// isEquals(0, 'false'); // poniważ false to string B, D
// isEquals([1, 2], '1,2'); // poniważ nie jest sprawdzany typ zmiennej A, D

// Co zwróci każde z poniższych wyrażen?
!!false; // false
!!true; // true
!!undefined; // false
!!null; // false

// ========================= Zadanie 2 =========================
// Jaki będzie efekt działania poniższego fragmentu kodu?
// Wyjaśnij wynik

const person = {
  firstName: "Jan",
  lastName: "Kowalski",
};

// console.log(person);
// person = {};
// console.log(person);
// Obiekt person zostanie nadpisane na pusty obiekt

// ========================= Zadanie 3 =========================
// Zapoznaj się z przykładami poniżej. Jaka jest różnica między var a let/const?

// if (true) {
//     var a = 2;
// }
// console.log(a);

// if (true) {
//     const b = 2;
// }
// console.log(b);

// -------

// Dla sprawdzenia działania obu poniższych pętli odkomentuj najpierw jedną, później drugą.
// Jaki będzie rezultat, jeśli obie pętle bedą odkomentowane jednocześnie. Wyjaśnij dlaczego.

// for (var i = 0; i < 10; i++) {
//     console.log(i);
// }
// console.log(i);

// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }
// console.log(i);

// poniważ var tworzy zmienną globalną dlatego w 10 iteracji pętli z let ostatni console.log nie zostanie wyświetlony
// -------

// var test = "var1";
// var test = "var2";

// let test2 = "let1";
// let test2 = "let2";

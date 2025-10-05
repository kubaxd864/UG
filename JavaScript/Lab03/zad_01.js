"use strict";

// Poniższe fragmenty kodu zostały zakomentowane w celu utrzymania porządku.
// Odkomentowuj je na bieżąco i zapisuj odpowiedzi w komentarzu.
// Ostatecznie przed wrzuceniem pliku na repozytorium zakomentowane powinny być tylko dodane odpowiedzi i fragmenty kodu powodujące ewentualne błędy.

// ========================= Zadanie 1 =========================
// Co zostanie wyświetlone na ekranie?
// Wyjaśnij wynik: Pierwszy i ostatni console.log wyświetlają zmienną globalną number natomiast drugi wyświetla zmienną lokalną number w miejscu określonym nawiasami.

let number = 3;
console.log(number); {
    let number = 4;
    console.log(number);
}
console.log(number);

// ========================= Zadanie 2 =========================
// Czym się różnią poniższe dwa fragmenty kodu?
// Jak działa operator '...'?

const arr = [1, 2];
const newArr1 = [arr, 3, 4];
console.log(newArr1);
const newArr2 = [...arr, 3, 4];
console.log(newArr2);

// Co zostanie wyświetlone na ekranie?
// Wyjaśnij wynik: poniważ operator ... rozwija dany element zwrócona zostanie tablica liter słowa javascript

const word = 'javascript';
const arrWord = [...word];
console.log(arrWord);

// ========================= Zadanie 3 =========================
// Zapoznaj się z kodem poniżej. Jaki będzie jego wynik i dlaczego?
// Wynikiem działania tego kodu jest sprawdzenie czy te dwie zmienne są typu NaN pierwsza zwróci true a druga false poniważ string nie jest NaN
var hello = 'Hello world!';
var result = hello / 2;

console.log(result);

console.log(Number.isNaN(result));
console.log(Number.isNaN(hello));

// ========================= Zadanie 4 =========================
// Patrząc na ten plik i z zeszłego tygodnia (ostatnie zadanie), odpowiedz do czego używany jest 'use strict' z pierwszej linijki skryptu?
// Użycie zapisu 'use strict' powoduje że nie działają niektóre mechanizmy Javascript które mogłyby mieć negatywny wpływ na bezpieczeństwo.

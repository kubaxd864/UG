function testThis() {
  console.log(this);
}

// testThis();

function testThis2() {
  "use strict";
  console.log(this);
}

// testThis2();
// 1. To słowo kluczowe którego znaczenie zależy od kontekstu jego wywołania
// 2. W pierwszym przypadku this odnosi się do obiektu globalnego, W drugim przypadku w
// trybie ścisłym nie można odnieść się do nieokreślonej w parametrach
// 3. W pierwszym przypadku Object [global] {...}, W drugim undefined

const person = {
  name: "Oscar Wilde",
  print() {
    console.log(this.name);

    function a() {
      console.log(this);
    }
    a();
  },
};

// person.print();
// 1. To słowo kluczowe którego znaczenie zależy od kontekstu jego wywołania
// 2. W pierwszym przypadku odnosi się do obiektu w którym jest wywołane w drugim this odnosi się do obiektu globalnego
// 3. W pierwszym przypadku Oscar Wilde w drugim Object [global] {...}

const person3 = {
  name: "Arthur Conan Doyle",
  print() {
    console.log(this);
    const a = () => {
      console.log(this);
    };
    a();
  },
};

// person3.print();
// 1. To słowo kluczowe którego znaczenie zależy od kontekstu jego wywołania
// 2. W pierwszym przypadku odnosi się do obiektu person3 w drugim this odnosi się do obiektu person3 w którym został zdefiniowany
// 3. W pierwszym przypadku 'Arthur Conan Doyle' w drugim print: [Function: print]
// 4. Funkcja strzałkowa sprawia że this odnosi się do this w miejscu w którym zostały zdefiniowane

const person4 = {
  name: "Jan Kowalski",
  print: function () {
    const details = {
      age: 24,
      print1: function () {
        "use strict";
        console.log(this);
      },
      print2: () => {
        "use strict";
        console.log(this);
      },
    };
    details.print1();
    details.print2();
  },
};

// person4.print();
// 1. To słowo kluczowe którego znaczenie zależy od kontekstu jego wywołania
// 2. W pierwszym przypadku odnosi się do paramentrów obiektu details w drugim this odnosi się całego obiektu person4
// 3. W pierwszym przypadku { age: 24, print1: [Function: print1], print2: [Function: print2] } w drugim { name: 'Jan Kowalski', print: [Function: print] }
// 4. Funkcja strzałkowa sprawia że this odnosi się do this w miejscu w którym zostały zdefiniowanes

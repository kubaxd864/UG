const book1 = {
  title: "Ojciec Chrzestny",
  author: "Mario Puzo",

  print: function () {
    console.log(`Autorem ${this.title} jest ${this.author}`);
  },
};

const book2 = {};
book2.title = "Pan Tadeusz";
book2.author = "Adam Mickiewicz";
book2.print = function () {
  console.log("Autorem " + this.title + " jest " + this.author);
};

function createBook(title, author) {
  const b = {};
  (b.title = title),
    (b.author = author),
    (b.print = function () {
      console.log(`Autorem ${this.title} jest ${this.author}`);
    });
  return b;
}

function Book(title, author, readers = 0) {
  (this.title = title),
    (this.author = author),
    (this.readers = readers),
    (this.print = function () {
      console.log(`Autorem ${this.title} jest ${this.author}`);
    }),
    (this.addReader = function () {
      this.readers++;
    }),
    (this.printReaders = function () {
      console.log(`Ilość czytelników ${this.readers}`);
    });
}

class BookCreator {
  constructor(title, author, readers = 0) {
    (this.title = title),
      (this.author = author),
      (this.readers = readers),
      (this.print = function () {
        console.log(`Autorem ${this.title} jest ${this.author}`);
      }),
      (this.addReader = function () {
        this.readers++;
      }),
      (this.printReaders = function () {
        console.log(`Ilość czytelników ${this.readers}`);
      });
  }
}

book1.print();
book2.print();
const book3 = createBook("Cień wiatru", "Carlos Ruiz Zafon");
const book4 = createBook("Ojciech Chrzestny", "Mario Puzo");
const book5 = new Book("Ojciech Chrzestny", "Mario Puzo");
const book6 = new BookCreator(
  "Arsene Lupin Dżentelmen Włamywacz",
  "Maurice Leblanc"
);
book3.print();
book4.print();
book5.print();
book5.printReaders();
book5.addReader();
book5.printReaders();
book6.printReaders();
book6.addReader();
book6.printReaders();

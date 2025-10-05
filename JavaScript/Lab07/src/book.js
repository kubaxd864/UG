class Book {
  constructor(title, author, year) {
    (this.title = title), (this.author = author), (this.year = year);
  }

  printDetails() {
    console.log(
      `Tytuł: ${this.title}\n Autor: ${this.author}\n Rok: ${this.year}`
    );
  }

  isRecent() {
    return new Date().getFullYear - this.year <= 10;
  }

  isByAuthor(author) {
    return author === this.author;
  }
}

const book1 = new Book(
  "Arsene Lupin Dżentelmen Włamywacz",
  "Maurice Leblanc",
  1957
);

const book2 = new Book(
  "Arsene Lupin Tajemnica Wydrążonej Iglicy",
  "Maurice Leblanc",
  1989
);

console.log(book2.isRecent());
console.log(book2.isByAuthor("Maurice Leblanc"));

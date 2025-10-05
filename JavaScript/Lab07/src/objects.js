const movie1 = {
  country: "USA",
  title: "Zielona Mila",
  director: "Frank Darabont",
  genre: "Dramat",
};

const { country: country, genre: genre, ...newMovie1 } = movie1;
console.log(newMovie1);

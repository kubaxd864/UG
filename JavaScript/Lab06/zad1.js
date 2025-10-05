const { lp3 } = require("./toplist");
const _ = require("lodash");

const queen = _.reduce(
  lp3,
  function (acc, curr) {
    if (curr.author == "Queen") {
      acc.push(curr);
    }
    return acc;
  },
  []
);

const pinkfloyd = _.reduce(
  lp3,
  function (acc, curr) {
    if (curr.author == "Pink Floyd" && curr.change > 10) {
      acc.push(curr);
    }
    return acc;
  },
  []
);

const sorted = _.chain(lp3).sortBy(["change"]).dropRight(10).value();

const firstplace = _.reduce(
  lp3,
  function (acc, curr) {
    if (curr.place == 1) {
      acc["author"] = curr.author;
      acc["song"] = curr.song;
    }
    return acc;
  },
  {}
);

const places = [2, 4, 8, 9, 11, 20, "XD"];
function songs(table) {
  const is_number = _.every(table, _.isInteger);
  if (is_number) {
    const songs_on_places = _.reduce(
      lp3,
      function (acc, curr) {
        if (table.includes(curr.place)) {
          acc.push(curr.song);
        }
        return acc;
      },
      []
    );
    return songs_on_places;
  } else {
    return "Not every place is number";
  }
}

function randomSongs(n, min, max) {
  const filteredSongs = _.filter(
    lp3,
    (song) => song.place >= min && song.place <= max
  );
  const randomSongs = _.times(n, () => _.sample(filteredSongs));
  return randomSongs;
}

const eachsong = (songs, delay) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < songs.length) {
      console.log(songs[index]);
      index++;
    } else {
      clearInterval(interval);
    }
  }, delay);
};

const loseplaces = _.filter(lp3, function (e) {
  return e.change < 0;
});

const songslistByTitle = _.keyBy(lp3, "song");
const bandcount = _.countBy(lp3, "author");
const maxIncrease = _.maxBy(lp3, "change");
const maxDecrease = _.minBy(lp3, "change");

const bandSongs = _.chain(lp3)
  .groupBy("author")
  .mapValues((songs) =>
    songs.map((e) => ({
      song: e.song,
      place: e.place,
    }))
  )
  .value();

// console.log(queen);
// console.log(pinkfloyd);
// console.log(sorted);
// console.log(firstplace);
// console.log(songs(places));
// console.log(randomSongs(3, 10, 15));
// eachsong(_.take(lp3, 10), 2000);
// console.log(loseplaces);
// console.log(songslistByTitle);
// console.log(maxDecrease, maxIncrease);
console.log(bandSongs);

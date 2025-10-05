const _ = require("lodash");

function detectChanges(original, modified) {
  const changes = _.differenceWith(
    _.values(modified),
    _.values(original),
    _.isEqual
  );
  return _.map(changes, function (e) {
    return [_.findKey(modified, (value) => value === e), e];
  });
}

const object1 = {
  id: 2,
  name: "Przyjaciele",
  startYear: 1994,
  endYear: 2004,
  type: ["Komedia"],
  seasons: 10,
};

const object2 = {
  id: 2,
  name: "Przyjaciele edytowany",
  startYear: 1994,
  endYear: 2010,
  type: ["Komedia"],
  seasons: 10,
};

console.log(detectChanges(object1, object2));

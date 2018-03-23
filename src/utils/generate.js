// let firebase = require('firebase')
import myData from "../assets/data.json";

console.log("Start");

let crs = {
  a: {
    word: "",
    size: 6,
    depends: [],
    descr: 1,
    starts: 2,
    align: "v"
  },
  b: {
    word: "",
    size: 5,
    depends: [{ selfPosition: 1, a: 1 }],
    descr: 1,
    starts: 6,
    align: "h"
  },
  c: {
    word: "",
    size: 5,
    depends: [{ selfPosition: 1, a: 5 }],
    descr: 21,
    starts: 26,
    align: "h"
  },
  d: {
    word: "",
    size: 5,
    depends: [{ selfPosition: 0, b: 2 }, { selfPosition: 4, c: 2 }],
    descr: 3,
    starts: 8,
    align: "v"
  },
  e: {
    word: "",
    size: 4,
    depends: [{ selfPosition: 0, a: 4 }, { selfPosition: 1, d: 3 }],
    descr: 21,
    starts: 22,
    align: "h"
  },
  f: {
    word: "",
    size: 4,
    depends: [{ selfPosition: 1, a: 3 }, { selfPosition: 2, d: 2 }],
    descr: 11,
    starts: 16,
    align: "h"
  },
  g: {
    word: "",
    size: 3,
    depends: [
      { selfPosition: 0, f: 3 },
      { selfPosition: 1, e: 2 },
      { selfPosition: 2, c: 3 }
    ],
    descr: 14,
    starts: 19,
    align: "v"
  },
  h: {
    word: "",
    size: 2,
    depends: [{ selfPosition: 0, b: 4 }],
    descr: 5,
    starts: 10,
    align: "v"
  },
  i: {
    word: "",
    size: 2,
    depends: [{ selfPosition: 1, b: 3 }],
    descr: 3,
    starts: 4,
    align: "v"
  },
  j: {
    word: "",
    size: 2,
    depends: [{ selfPosition: 0, e: 3 }, { selfPosition: 1, c: 4 }],
    descr: 20,
    starts: 25,
    align: "v"
  }
};

function findTheWord(word) {
  let size = word.size;
  if (size == 6) return;
  let correct;
  for (var i = 0; i < localWords[size].length; i++) {
    correct = true;
    for (var j = 0; j < word.depends.length; j++) {
      let selfPos = Object.values(word.depends[j])[0];
      let postion = Object.values(word.depends[j])[1];

      let dependableWord = crs[Object.keys(word.depends[j])[1]];
      // console.log(allWords[size][i].value[postion]);
      // console.log("1 " + dependableWord.word[postion]);

      if (localWords[size][i].value[selfPos] != dependableWord.word[postion]) {
        correct = false;
      }
    }
    if (correct) {
      word.word = localWords[size][i].value;
      word.description = localWords[size][i].key;
    } else {
      correct = false;
    }
  }
}

let localWords = { 9: [], 8: [], 7: [], 6: [], 5: [], 4: [], 3: [], 2: [] };

function shuffle(array) {
  var copy = [],
    n = array.length,
    i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}

function fillLocalWords() {
  // console.log(myData);
  var obj = myData;

  for (var j = 2; j < 10; j++) {
    for (var i = 0; i < Object.values(obj[j]).length; i++) {
      localWords[j].push(Object.values(obj[j])[i]);
    }
  }
}

// generateCrossword();
function generateCrossword() {
  fillLocalWords();
  for (var i = 2; i <= Object.keys(localWords).length; i++) {
    localWords[i] = shuffle(localWords[i]);
  }
  console.log(localWords[6][0].value);
  crs.a.word = localWords[6][0].value;
  crs.a.description = localWords[6][0].key;
  Object.keys(crs).map(e => findTheWord(crs[e]));
  console.log(crs);
  return crs;
}

export default generateCrossword;

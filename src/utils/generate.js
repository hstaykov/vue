// let firebase = require('firebase')
const fs = require('fs');

console.log("Start")

let crs = {
  a : {
    word : '',
    size : 6,
    depends: [],
    descr: 1,
    starts: 2,
    align: 'v'
  },
  b: {
    word: '',
    size : 5,
    depends: [{selfPosition: 1, 'a' : 1}],
    descr: 1,
    starts: 6,
    align: 'h'
  },
  c: {
    word: '',
    size : 5,
    depends: [{selfPosition: 1, 'a' : 5}],
    descr: 21,
    starts: 26,
    align: 'h'
  },
  d: {
    word: '',
    size : 5,
    depends: [{selfPosition: 0, 'b' : 2}, {selfPosition: 4,'c': 2}],
    descr: 3,
    starts: 8,
    align: 'v'
  },
  e: {
    word: '',
    size : 4,
    depends: [{selfPosition: 0, 'a' : 4}, {selfPosition: 1,'d': 3}],
    descr: 21,
    starts: 22,
    align: 'h'
  },
  f: {
    word: '',
    size : 4,
    depends: [{selfPosition: 1, 'a': 3}, {selfPosition: 2, 'd': 2}],
    descr: 11,
    starts: 16,
    align: 'h'
  },
  g:{
    word: '',
    size : 3,
    depends: [{selfPosition: 0,'f': 3}, {selfPosition: 1,'e': 2}, {selfPosition: 2,'c': 3}],
    descr: 14,
    starts: 19,
    align: 'v'
  },
  h: {
    word : '',
    size : 2,
    depends: [{selfPosition: 0,'b' : 4}],
    descr: 5,
    starts: 10,
    align: 'v'
  },
  i: {
    word: '',
    size : 2,
    depends: [{selfPosition: 1,'b' : 3}],
    descr: 3,
    starts: 4,
    align: 'v'
  },
  j: {
    word: '',
    size : 2,
    depends: [{selfPosition: 0,'e': 3}, {selfPosition: 1, 'c' : 4}],
    descr: 20,
    starts: 25,
    align: 'v'
  }
}

function findTheWord(word){
  let size = word.size;
  if(size == 6)
    return
  let correct;
  for (var i = 0; i < localWords[size].length; i++) {

    correct = true;
    for (var j = 0; j < word.depends.length; j++) {

      let postion = Object.values(word.depends[j])[1];
      let selfPos = Object.values(word.depends[j])[0];
      let dependableWord = crs[Object.keys(word.depends[j])[1]]
      // console.log(allWords[size][i].value[postion]);
      // console.log("1 " + dependableWord.word[postion]);

      if(localWords[size][i].value[selfPos] != dependableWord.word[postion]){
        correct = false;
      }
    }
    if(correct){
      word.word = localWords[size][i].value;
      word.description = localWords[size][i].key;
    }
    else {
      correct = false;
    }
  }
}


let localWords = { 9: [], 8: [], 7: [], 6 : [], 5: [], 4: [], 3: [], 2: [] };



function shuffle(array) {
  var copy = [], n = array.length, i;

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

function generateCrossword() {
  firebase.auth().signInWithEmailAndPassword('riceto.new@gmail.com', 'riceto123').then(
    (user) => {
      require("firebase/firestore");
      var db = firebase.firestore();



      db.collection('9').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("9 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[9].push(doc.data());
          });
      });

      db.collection('8').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("8 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[8].push(doc.data());
          });
      });

      db.collection('7').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("7 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[7].push(doc.data());
          });
      });

      db.collection('6').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("6 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[6].push(doc.data());
          });
          let random = Math.floor(Math.random() * allSize);
          crs['a'].word=localWords[6][random].value
      });

      db.collection('5').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("5 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[5].push(doc.data());
          });
      });
      db.collection('4').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("4 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[4].push(doc.data());
          });
      });
      db.collection('3').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("3 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[3].push(doc.data());
          });
      });
      db.collection('2').get().then(function(querySnapshot) {
        let allSize = querySnapshot.size;
        console.log("2 words " + querySnapshot.size);
          querySnapshot.forEach(function(doc) {
            localWords[2].push(doc.data());
          });
      });
    },
    (err) => {
      alert('Oops. ' + err.message)
    }
  );
  setTimeout(function () {
    if(localWords[2].length > 0 && localWords[3].length > 0 && localWords[4].length > 0
        && localWords[5].length > 0 && localWords[6].length > 0 && localWords[7].length > 0
        && localWords[8].length > 0 && localWords[9].length > 0 ){

      for (var i = 2; i <= Object.keys(localWords).length; i++) {
          localWords[i] = shuffle(localWords[i])
      }
      Object.keys(crs).map(e => findTheWord(crs[e]));
      console.log(crs);
      return crs;



    }
  }, 5090);
}

export default { generateCrossword };

console.log("SSSSSSSSSSSSSSss")
var fs = require('fs');
var firebase = require('firebase')
var obj = JSON.parse(fs.readFileSync('ada.json', 'utf8'));
//


const config = {
  apiKey: 'AIzaSyBbzztDdpCgB91N8RxXnTCnbRq_RKu0Dmk',
  authDomain: 'crosswords-c5b76.firebaseapp.com',
  databaseURL: 'https://crosswords-c5b76.firebaseio.com',
  projectId: 'crosswords-c5b76',
  storageBucket: 'crosswords-c5b76.appspot.com',
  messagingSenderId: '31934474605',
};

firebase.initializeApp(config);
var db = firebase.database();

firebase.auth().signInWithEmailAndPassword("riceto.new@gmail.com", "riceto123").then(
  (user) => {

  },
  (err) => {

  }
);

// addWordToFirebase("aaa", "bbb")

function addWordToFirebase(key, value) {
  let len = value.length;
  let ref = db.ref(len + "/" + value);
  ref.set({
    key : key,
    value : value,
    addedBy : "Riceto",
    timestamp: firebase.database.ServerValue.TIMESTAMP
  })
}
for (var x = 2; x < obj.length+2; x++) {
  for (var i = 0; i < obj[x].length; i++) {
    addWordToFirebase(obj[x][i].key, obj[x][i].value)
  }
}

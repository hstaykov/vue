console.log("SSSSSSSSSSSSSSss")
var fs = require('fs');
var firebase = require('firebase')
var obj = JSON.parse(fs.readFileSync('9.json', 'utf8'));
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
firebase.auth().signInWithEmailAndPassword("riceto.new@gmail.com", "riceto123").then(
  (user) => {
    // addWordToFirebase("aaa", "bbb34")
    for (var i = 0; i < Object.values(Object.values(obj)[0]).length; i++) {
      console.log(Object.values(Object.values(obj)[0])[i].value);
      addWordToFirebase(Object.values(Object.values(obj)[0])[i].key, Object.values(Object.values(obj)[0])[i].value)
    }
  },
  (err) => {

  }
);

// addWordToFirebase("aaa", "bbb")
console.log(Object.values(Object.values(obj)[0]).length);
// for (var i = 0; i < Object.values(Object.values(obj)[0]).length; i++) {
//   console.log(Object.values(Object.values(obj)[0])[i].value);
// }

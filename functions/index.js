'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Keeps track of the length of the 'likes' child list in a separate property.
exports.countlikechange = functions.database.ref('/{n}/{m}').onWrite((event) => {
  const collectionRef = event.data.ref.parent;
  const countRef = collectionRef.parent.child('words_count');

  let increment;
  if (event.data.exists() && !event.data.previous.exists()) {
    increment = 1;
  } else if (!event.data.exists() && event.data.previous.exists()) {
    increment = -1;
  } else {
    return null;
  }

  // Return the promise from countRef.transaction() so our function
  // waits for this async event to complete before it exits.
  return countRef.transaction((current) => {
    return (current || 0) + increment;
  }).then(() => {
    return console.log('Counter updated.');
  });
});

// If the number of likes gets deleted, recount the number of likes
exports.recountlikes = functions.database.ref('/words_count').onWrite((event) => {
  if (!event.data.exists()) {
    const counterRef = event.data.ref;
    const collectionRef = counterRef.parent.child('/');

    // Return the promise from counterRef.set() so our function
    // waits for this async event to complete before it exits.
    return collectionRef.once('value')
      .then((messagesData) => counterRef.set(messagesData.numChildren()));
  }
  return null;
});

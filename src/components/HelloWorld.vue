<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Add a word</h2>

    <el-input ref="inputKey"  class="wordInput" placeholder="Description" v-model="addedKey"></el-input><el-input ref="inputValue" class="wordInput" placeholder="Word" v-model="addedValue"></el-input>
     <el-button type="success"  v-on:click="addWord">Add word</el-button>

    <p> {{ currentUser.email }}</p>
    <el-button type="danger"  v-on:click="logout">Logout</el-button>

  </div>
</template>

<script>
import firebase from 'firebase';
require("firebase/firestore");






// Get all the data so we can make fast queries





let bigCrs = {
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: []
}

let inputKey;
let inputValue;
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentUser: firebase.auth().currentUser,
      addedKey : '',
      addedValue : '',
      statusMsg : '',
    };
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });
    },
    addWord: function () {






      if(this.addedValue.toLowerCase().indexOf(' ') != -1){
        this.showFail("Without spaces");
        return;
      }

      if(!/^[а-я]+$/.test(this.addedValue.toLowerCase())){
          this.showFail("Only bulgarian characters");
          return;
      }

      if(this.addedKey.toLowerCase().length === 0 || this.addedValue.toLowerCase().length === 0){
        this.showFail("The words are empty");
        return;
      }

      if(bigCrs[this.addedValue.toLowerCase()]){
        this.$confirm('Already added <b>' + bigCrs[this.addedValue.toLowerCase()].key + '\n  </b>Do you want to override it ?' , 'Warning', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          addWordToFirebase(this.addedKey.toLowerCase(), this.addedValue.toLowerCase());
          this.showSuccess();
          this.addedValue = '';
          this.addedKey = '';
          inputKey.focus();
          

        }).catch(() => {

          this.addedValue = '';
          this.addedKey = '';
          inputKey.focus();
        });
        // alert(bigCrs[this.addedValue.toLowerCase()].key)
      }
      else {
        addWordToFirebase(this.addedKey.toLowerCase(), this.addedValue.toLowerCase());
        this.showSuccess();
        this.addedValue = '';
        this.addedKey = '';
        inputKey.focus();
        updateLocalStore();
      }




    },
    showSuccess() {
       this.$notify({
         title: 'Success',
         message: 'Word successfully added.',
         type: 'success'
       });
  },
  showFail(msg) {
     this.$notify({
       title: 'Fail',
       message: msg,
       type: 'error'
     });
   },
},
  mounted (){
    console.log("aaaaaaaaaa");

    updateLocalStore();
    inputKey = this.$refs.inputKey
    inputValue = this.$refs.inputValue
    inputKey.focus();
  },
}


function updateLocalStore(){
  let db = firebase.firestore();
  db.collection('2').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
  bigCrs[doc.data().value]=(doc.data())
  });
})
  db.collection('3').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
  bigCrs[doc.data().value]=(doc.data())
  });
  })
  db.collection('4').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    bigCrs[doc.data().value]=(doc.data())
  });
  })
  db.collection('5').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    bigCrs[doc.data().value]=(doc.data())
  });
  })
  db.collection('6').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    bigCrs[doc.data().value]=(doc.data())
  });
  })
  db.collection('7').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    bigCrs[doc.data().value]=(doc.data())
  });
});
db.collection('8').get().then((querySnapshot) => {
querySnapshot.forEach((doc) => {
  bigCrs[doc.data().value]=(doc.data())
});
});
db.collection('9').get().then((querySnapshot) => {
querySnapshot.forEach((doc) => {
  bigCrs[doc.data().value]=(doc.data())
});
});
}

function addWordToFirebase(key, value) {
  value = value.trim();


  let len = value.length;

  let db = firebase.firestore();

 var wordRef = db.collection(len.toString()).doc(value);
 var statsRef = db.collection('stats').doc('wordCount');
db.runTransaction(transaction => {
   return transaction.get(statsRef).then(res => {

     let newCount = res.data().allWords + 1;
     transaction.set(statsRef, {allWords : newCount});
     transaction.set(wordRef, {
       key : key,
       value : value,
       addedBy : firebase.auth().currentUser.email,
       timestamp: firebase.firestore.FieldValue.serverTimestamp()
     });
   })
 })

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wordInput{
  width: 16%;
  padding: 10px
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

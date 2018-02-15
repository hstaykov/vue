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
      let value = this.addedValue.toLowerCase();
      let db = firebase.database();
      let len = value.length;
      let ref = db.ref(len + "/" + value);
      let that = this;
      ref.once('value').then(function (snapshot) {
        let  exists = snapshot.val();
        if(exists){
          console.log("======================");
          that.$confirm('Already added <b>' + exists.key + '\n  </b>Do you want to override it ?' , 'Warning', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            addWordToFirebase(that.addedKey.toLowerCase(), that.addedValue.toLowerCase());

            that.showSuccess();
            that.addedValue = '';
            that.addedKey = '';
            inputKey.focus();


          }).catch(() => {

            that.addedValue = '';
            that.addedKey = '';
            inputKey.focus();
          });

        }
        else {
          addWordToFirebase(that.addedKey.toLowerCase(), that.addedValue.toLowerCase());

          that.showSuccess();
          that.addedValue = '';
          that.addedKey = '';
          inputKey.focus();

        }
      })
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

    inputKey = this.$refs.inputKey
    inputValue = this.$refs.inputValue
    inputKey.focus();
  },
}


function addWordToFirebase(key, value) {
  let db = firebase.database();
  let len = value.length;
  let ref = db.ref(len + "/" + value);
  ref.set({
    key : key,
    value : value,
    addedBy : firebase.auth().currentUser.email,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
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

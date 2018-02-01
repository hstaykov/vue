<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>

    <el-input ref="inputKey"  class="wordInput" placeholder="Description" v-model="addedKey"></el-input><el-input ref="inputValue" class="wordInput" placeholder="Word" v-model="addedValue"></el-input>
     <el-button type="success"  v-on:click="addWord">Add word</el-button>
    <p> {{ statusMsg }}</p>
    <p> {{ currentUser.email }}</p>
    <button v-on:click="logout">Logout</button>
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
      addWordToFirebase(this.addedKey.toLowerCase(), this.addedValue.toLowerCase());
      this.statusMsg = "Word added...";
      this.showSuccess();
      this.addedValue = '';
    },
    showSuccess() {
       this.$notify({
         title: 'Success',
         message: 'Word successfully added.',
         type: 'success'
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
  if(key.length === 0 || value.length === 0){
    alert("Add a proper word");
  }
  let len = value.length;
  let db = firebase.firestore();
  db.collection(len.toString()).doc(value).set({
    key : key,
    value : value,
    addedBy : firebase.auth().currentUser.email,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function(docRef) {
    console.log("Document written with ID: ");
    inputKey.focus();
    inputKey.value = '';
    inputValue.value = '';
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

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

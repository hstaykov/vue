<template>
  <header class="header">
    <a>Words count</a><a> {{words}}</a>
  </header>
</template>
<script>
import firebase from 'firebase';
require("firebase/firestore");



  export default {
    data() {
      return {
        title: 'Check me',
        words: 0,

      }
    },
    methods: {
      check() {
        this.checked = !this.checked;
      }
    },
    mounted: function () {
    // `this` points to the vm instance
    let that = this;
    var starCountRef = firebase.database().ref('words_count');
      starCountRef.on('value', function(snapshot) {
        that.words = snapshot.val();
      });
    }

    }

</script>

<style scoped>
.header{
  background-color: #53bb80;
  margin: 0px;
  height: 40px;
}
</style>

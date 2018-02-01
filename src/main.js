// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
let app;
const config = {
  apiKey: "AIzaSyBbzztDdpCgB91N8RxXnTCnbRq_RKu0Dmk",
  authDomain: "crosswords-c5b76.firebaseapp.com",
  databaseURL: "https://crosswords-c5b76.firebaseio.com",
  projectId: "crosswords-c5b76",
  storageBucket: "crosswords-c5b76.appspot.com",
  messagingSenderId: "31934474605"
};

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});

import Vue from "vue";
import Router from "vue-router";

import Hello from "@/components/HelloWorld";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import GenerateCrossword from "@/components/GenerateCrossword";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/hello",
      name: "Hello",
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/generate",
      name: "GenerateCrossword",
      component: GenerateCrossword
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else
    // else if (!requiresAuth && currentUser) next('hello')
    next();
});

export default router;

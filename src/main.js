// JS
import './js'

// SCSS
import './assets/scss/main.scss'

// Vue.js
import Vue from 'vue';
import * as firebase from 'firebase';
import App from './App.vue';
import router from './router/router';
import store from './store/store';



new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: "AIzaSyChF5qaxwSPVXnH4GYe7EZu-Qu5Likv8bg",
            authDomain: "my-vue-todo.firebaseapp.com",
            databaseURL: "https://my-vue-todo.firebaseio.com",
            projectId: "my-vue-todo",
            storageBucket: "my-vue-todo.appspot.com",
            messagingSenderId: "721897818042",
            appId: "1:721897818042:web:159c4b83395f3c6485ff83"
        });
    }
});

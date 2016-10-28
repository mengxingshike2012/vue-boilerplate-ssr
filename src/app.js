import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store';
import router from './router';

const app = new Vue({
  store,
  router,
  ...App,
});

// when doing ssr, we do not directly mount it.
// app.$mount('#app');
export { app, store, router };

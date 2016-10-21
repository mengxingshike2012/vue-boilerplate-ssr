import Vue from 'vue';
import App from './App';
import store from './vuex/store';
import router from './router';

const app = new Vue({
  store,
  router,
  ...App,
});

app.$mount('#app');

import Vue from 'vue';
import Router from 'vue-router';

import V2exHotTopics from '../views/List.vue';
import V2exTopicDetail from '../views/Detail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: V2exHotTopics },
    { path: '/:id', component: V2exTopicDetail },
  ],
});

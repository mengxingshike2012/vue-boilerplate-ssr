import Vue from 'vue';
import Router from 'vue-router';

import V2exHotTopics from '../views/List';
import V2exTopicDetail from '../views/Detail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: V2exHotTopics },
    { path: '/:id', component: V2exTopicDetail },
  ],
});

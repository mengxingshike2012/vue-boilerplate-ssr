import Vue from 'vue';
import Vuex from 'vuex';

import * as V2exApi from './apis/v2ex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
    topics: [],
    detail: null,
  },
  // ??? Can I use Async/Await  -> maybe yes
  // action of react is plain object, but we can use redux-thunk
  // white in vue, we not only have actions but also mutations
  // it's more like we already have redux-thunk/redux-sagas if not think about testing
  actions: {
    fetchHotTopics: async ({ commit }) => {
      commit('fetchHotTopicsRequestStart');
      const data = await V2exApi.fetchHotTopics();
      commit('fetchHotTopicsRequestSuccess', { data });
    },
    fetchTopicDetail: async ({ commit }, { id }) => {
      commit('fetchTopicDetailStart');
      const data = await V2exApi.fetchTopicDetail(id);
      commit('fetchTopicDetailSuccess', { data });
    },
  },
  // it seems that we can directly modify state white we use ... in reducers, react.
  /* eslint no-param-reassign: 0 */
  mutations: {
    fetchHotTopicsRequestStart: (state) => {
      state.isLoading = true;
    },
    fetchHotTopicsRequestSuccess: (state, { data }) => {
      state.topics = data;
      state.isLoading = false;
    },
    fetchTopicDetailStart: (state) => {
      state.isLoading = true;
    },
    fetchTopicDetailSuccess: (state, { data }) => {
      state.detail = data;
      state.isLoading = false;
    },
  },
  // will be used in view's computed properties
  // so naming is important.
  getters: {
    isLoading: state => state.isLoading,
    topics: state => state.topics,
    detail: state => state.detail,
  },
});
export default store;

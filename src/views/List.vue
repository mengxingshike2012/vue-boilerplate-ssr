<template>
  <div class="container">
      <div class="media" v-for="topic in topics" :key="topic.id">
         <div class="media-left">
           <img src="topic.members.avatar_normal" />
         </div>
         <div class="media-content">
           <router-link :to="topic.id">{{ topic.title }} </router-link>
         </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'v2ex-hotTopics',
  components: {},
  //work together with getters of store
  computed:{
    ...mapGetters({
      'isLoading',
      'topics',
    })
  },
  beforeMount() {
    // dispatch action is a little easy than react.
    this.$store.dispatch('fetchHotTopics');
  }
}
</script>
<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    margin: 70 auto 0;
    padding: 5px;
    width: 700px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .media {
    display:flex;
    flex-direction: row;

    .media-left: {
      width: 100px;
    }
    .media-content: {
      flex: 1;
    }
  }
</style>

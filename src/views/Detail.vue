<template>
  <div class="main">
    <template v-if="!isLoading">
      {{ detail.content }}
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'v2ex-topic-detail',
  components: {},
  computed: {
    ...mapGetters{[
      'isLoading',
      'detail',
    ]}
  },
  beforeMount() {
    this.$store.dispatch('fetchTopicDetail', {id: this.$store.state.router.params.id});
  }
}
</script>

<style lang="scss">
.main {
  margin: 70 auto 0;
  padding: 5px;
  width: 700px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

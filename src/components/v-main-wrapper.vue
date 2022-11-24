<template>
  <div class="v-main-wrapper">
    <v-header />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import vHeader from './layouts/v-header'

export default {
  name: 'v-main-wrapper',
  components: {
    vHeader
  },
  props: {},
  data() {
    return {
      title: 'Main wrapper',
    };
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {
    console.log("Hello I'm alive!");
  },
};
</script>

<style>
.v-main-wrapper {
  /* max-width: 900px; */
  margin: 0 auto;
}
</style>

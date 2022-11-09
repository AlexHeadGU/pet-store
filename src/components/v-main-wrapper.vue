<template>
  <div class="v-main-wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'v-main-wrapper',
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
  max-width: 900px;
  margin: 0 auto;
}
</style>

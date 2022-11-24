<template>
  <div id="app">
    <v-main-wrapper />
  </div>
</template>

<script>
import vMainWrapper from './components/v-main-wrapper';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    vMainWrapper,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'IS_MOBILE',
      'IS_DESKTOP'
    ])
  },
  methods: {
    ...mapActions([
      'SET_MOBILE',
      'SET_DESKTOP'
    ])
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
        this.SET_DESKTOP();
      } else {
        this.SET_MOBILE();
      }
    })
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 160px;
}
</style>

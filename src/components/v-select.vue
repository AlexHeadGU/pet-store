<template>
  <div class="v-select">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">{{ selected }}</p>
    <div class="options" v-if="areOptionsVisible || !isExpanded">
      <p v-for="option in options" :key="option.value" @click="selectOption(option)">
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-select",
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selected: {
      type: String,
      default: ''
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  computed: {},
  methods: {
    selectOption(option) {
      this.$emit('selectOption', option);
      this.areOptionsVisible = false;
      // this.selected = option.
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideSelect)
  }
}
</script>

<style lang="scss">
.v-select {
  position: relative;
  width: 200px;
  cursor: pointer;
  text-align: left;

  .title {
    border: solid 1px #aeaeae;
    padding: $padding;
  }

  p {
    margin: 0;
  }
}

.options {
  border: solid 1px #aeaeae;
  background: #ffffff;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  width: 100%;

  p {
    &:hover {
      background: #e7e7e7;
    }
  }
}
</style>
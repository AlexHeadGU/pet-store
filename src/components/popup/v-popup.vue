<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{ popupTitle }}</span>
        <span class="material-icons" @click="closePopup">close</span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button class="close_modal" @click="closePopup">Close</button>
        <button class="submit_btn" @click="rightBntAction">{{ rightBtnTitle }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {
    popupTitle: {
      type: String,
      default: 'Popup name'
    },
    rightBtnTitle: {
      type: String,
      default: 'Ok'
    }
  },
  data() {
    return {}
  },
  methods: {
    rightBntAction() {
      this.$emit('rightBntAction')
    },
    closePopup() {
      this.$emit('closePopup')
    }
  },
  mounted() {
    document.addEventListener('click', (item) => {
      if (item.target === this.$refs['popup_wrapper']) {
        this.closePopup();
      }
    })
  }
}
</script>

<style lang="scss">
.popup_wrapper {
  background: rgba(64, 64, 64, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.v-popup {
  padding: 16px;
  position: fixed;
  top: 50px;
  width: 400px;
  background: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  z-index: 10;

  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .submit_btn {
    padding: 8px;
    color: #ffffff;
    background: #26ae68;
    border: 0;
    cursor: pointer;
  }

  .close_modal {
    padding: 8px;
    color: #ffffff;
    background: red;
    border: 0;
    cursor: pointer;
  }

  .material-icons {
    cursor: pointer;
  }
}
</style>
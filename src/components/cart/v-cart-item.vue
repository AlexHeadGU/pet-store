<template>
  <div class="v-cart-item">
    <img class="v-cart-item__image" :src="require('@/assets/images/' + cart_item_data.image)" alt="img">
    <div class="v-cart-item__info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ formattedPrice }}</p>
      <p>{{ cart_item_data.article }}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Qty:</p>
      <span>
        <span class="quantity_btn" @click="decrementItem">-</span>
        {{ cart_item_data.quantity }}
        <span class="quantity_btn" @click="incrementItem">+</span>
      </span>
    </div>
    <button @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>

export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    formattedPrice() {
      let parts = this.cart_item_data.price.toFixed(2).toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".") + ' ₽';
    },

    // fixedPrice() {
    //   return this.cart_item_data.price.toFixed(2);
    // }
  },
  methods: {
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() { }
}
</script>

<style lang="scss">
.v-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding*2;
  margin-bottom: $margin*2;

  &__image {
    max-width: 50px;
  }

  .quantity_btn {
    cursor: pointer;
  }
}
</style>
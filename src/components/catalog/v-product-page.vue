<template>
  <div class="v-product-page">
    <img v-if="product.image" class="v-catalog-item__image" :src="require('../../assets/images/' + product.image)"
      alt="img">
    <p>Product name: {{ product.name }}</p>
    <p>Article: {{ product.article }}</p>
    <p v-if="product.price">Price: {{ formattedPrice }}</p>
    <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "v-product-page",
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'PRODUCTS'
    ]),
    product() {
      let result = {};
      this.PRODUCTS.map((item) => {
        if (item.article === this.$route.query.product) {
          result = item;
        }
      })
      return result
    },
    formattedPrice() {
      let parts = this.product.price.toFixed(2).toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".") + ' ₽';
    },
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    addToCart() {
      this.ADD_TO_CART(this.product)
    },
  },

  mounted() {
    this.GET_PRODUCTS_FROM_API()
  }
}
</script>

<style lang="scss">

</style>
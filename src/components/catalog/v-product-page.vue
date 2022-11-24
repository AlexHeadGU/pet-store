<template>
  <div class="v-product-page">
    <!-- <img class="v-catalog-item__image" :src="require('../../assets/images/' + product.image)" alt="img"> -->
    <p>{{ product.image }}</p>
    <p>Product name: {{ product.name }}</p>
    <p>Article: {{ product.article }}</p>
    <p>Price: {{ product.price }}</p>
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
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API'
    ])
  },

  mounted() {
    this.GET_PRODUCTS_FROM_API()
  }
}
</script>

<style lang="scss">

</style>
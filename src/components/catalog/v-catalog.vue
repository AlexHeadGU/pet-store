<template>
  <div class="v-catalog">
    <router-link :to="{ name: 'cart' }">
      <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>
    <h1>Catalog</h1>
    <v-select :selected="selected" :options="categories" @selectOption="filterByCategories" />
    <div class="v-catalog__list">
      <v-catalog-item v-for="product in sortedProducts" :key="product.article" :product_data="product"
        @addToCart="addToCart" />
    </div>
  </div>
</template>
  
<script>
import vCatalogItem from './v-catalog-item';
import { mapActions, mapGetters } from 'vuex';
import vSelect from '@/components/v-select';

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vSelect,
  },
  props: {},
  data() {
    return {
      categories: [
        { name: 'Все', value: 'ALL' },
        { name: 'Мужские', value: 'м' },
        { name: 'Женские', value: 'ж' }
      ],
      selected: 'Все',
      filtredProducts: []
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART'
    ]),
    sortedProducts() {
      if (this.filtredProducts.length) {
        return this.filtredProducts
      } else {
        return this.PRODUCTS
      }
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
    filterByCategories(category) {
      this.filtredProducts = [];
      let vm = this;
      this.PRODUCTS.map(function (item) {
        if (item.category === category.name) {
          vm.filtredProducts.push(item)
        }
      });
      this.selected = category.name;
    }
  },
  mounted() {
    this.$store.dispatch('GET_PRODUCTS_FROM_API')
      .then((response) => {
        if (response.data) {
          console.log('Data arrived!')
        }
      })
  }
}
</script>
  
<style lang="scss">
.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  &__link_to_cart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: $padding*2;
    border: solid 1px #aeaeae;
  }
}
</style>
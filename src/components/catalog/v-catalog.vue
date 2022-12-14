<template>
  <div class="v-catalog">

    <v-notification :messages="messages" />

    <router-link :to="{ name: 'cart' }">
      <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>
    <h1>Catalog</h1>
    <div class="filters">
      <v-select :selected="selected" :options="categories" @selectOption="filterByCategories"
        :isExpanded="IS_DESKTOP" />
      <div class="range-slider">
        <input type="range" min="0" max="10000" step="100" v-model.number="minPrice" @change="setRangeSliders">
        <input type="range" min="0" max="10000" step="100" v-model.number="maxPrice" @change="setRangeSliders">
      </div>
      <div class="range-values">
        <p>Min: {{ minPrice }}</p>
        <p>Max: {{ maxPrice }}</p>
      </div>
    </div>
    <div class="v-catalog__list">
      <v-catalog-item v-for="product in sortedProducts" :key="product.article" :product_data="product"
        @addToCart="addToCart" @productClick="productClick" />
    </div>
  </div>
</template>
  
<script>
import vCatalogItem from './v-catalog-item';
import { mapActions, mapGetters } from 'vuex';
import vSelect from '@/components/v-select';
import vNotification from '@/components/notification/v-notification'

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vSelect,
    vNotification,
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
      filtredProducts: [],
      minPrice: 0,
      maxPrice: 10000,
      messages: []
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART',
      'IS_MOBILE',
      'IS_DESKTOP',
      'SEARCH_VALUE'
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
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    productClick(article) {
      this.$router.push({
        name: 'product',
        query: {
          'product': article
        }
      })
    },
    addToCart(data) {
      this.ADD_TO_CART(data)
        .then(() => {
          let timeStamp = Date.now().toLocaleString();
          this.messages.unshift(
            { name: "Товар добавлен в корзину", icon: 'check_circle', id: timeStamp }
          )
        })
    },
    setRangeSliders() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.filterByCategories();
    },

    filterByCategories(category) {
      this.filtredProducts = [...this.PRODUCTS]
      this.filtredProducts = this.filtredProducts.filter((item) => {
        return item.price >= this.minPrice && item.price <= this.maxPrice
      })
      if (category) {
        this.filtredProducts = this.filtredProducts.filter((e) => {
          this.selected = category.name;
          return e.category === category.name;
        })
      }
    },
    filterProductsBySearchValue(value) {
      this.filtredProducts = [...this.PRODUCTS]
      if (value) {
        this.filtredProducts = this.filtredProducts.filter((item) => {
          return item.name.toLowerCase().includes(value.toLowerCase());
        })
      } else {
        this.filtredProducts = this.PRODUCTS;
      }
    }
  },
  watch: {
    SEARCH_VALUE() {
      this.filterProductsBySearchValue(this.SEARCH_VALUE)
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
      .then((response) => {
        if (response.data) {
          console.log('Data arrived!');
          this.filterByCategories();
          this.filterProductsBySearchValue(this.SEARCH_VALUE);
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
    position: fixed;
    top: 82px;
    right: 10px;
    padding: $padding*2;
    border: solid 1px #aeaeae;
    background: #ffffff;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.range-slider {
  width: 200px;
  margin: auto 16px;
  text-align: center;
  position: relative;

  svg,
  input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
}
</style>
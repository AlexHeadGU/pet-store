import { createStore } from 'vuex'
import commonActions from './actions/actions';
import apiRequests from './actions/api-requests';
import mutations from './mutations/mutations';
import getters from './getters/getters';

const actions = {...commonActions, ... apiRequests}

const store = createStore({
  state() {
    return {
      isMobile: false,
      isDesktop: true,
      products: [],
      cart: []
    }
  },
  mutations,
  actions,
  getters,
});

export {store};
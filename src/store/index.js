import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from '../state/auth';
import * as bukkake from '../state/bukkake';

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    bukkake
  }
})

export default store;

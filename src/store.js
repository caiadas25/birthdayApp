import Vue from 'vue'
import Vuex from 'vuex'
import { buildObject } from './fetchDataService';




Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'My Custom Title',
    links: [
      'google',
      'youtube',
      'expresso',
    ]
  },
  mutations: {

  },
  actions: {

  }
})

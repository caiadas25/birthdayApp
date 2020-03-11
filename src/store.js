import Vue from 'vue'
import Vuex from 'vuex'




Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    friends: [],
    title: 'My Custom Title',
    links: [
      'google',
      'youtube',
      'expresso',
    ]
  },
  getters: {
    getData: state => {
      return state.friends
    },
    countLinks: state => {
      return state.links.length
    }
  },
  mutations: {

  },
  actions: {

  }
})

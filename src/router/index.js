import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/views/homepage'
import addPerson from '@/views/addPerson'
import viewPerson from '@/views/viewPerson'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/addPerson',
      name: 'addPerson',
      component: addPerson
    },
    {
      path: '/:name',
      name: 'viewPerson',
      component: viewPerson,
    },
  ]
})

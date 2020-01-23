<template>
  <div class="person-container">
      {{name}}
      {{birthDay}}
      {{birthMonth}}
  </div>
</template>

<script>
import db from '../firebase/firebaseInit.js';

export default {
  name: 'viewPerson',
  methods: {
  },
  data () {
    return {
      name: null,
      birthDay: null,
      birthMonth: null,
    }
  },
  created() {
  },

  beforeRouteEnter (to, from, next) {
    db.collection('people').where('name', '==', to.params.name).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.name = doc.data().name
          vm.birthDay = doc.data().birthDay
          vm.birthMonth = doc.data().birthMonth
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      db.collection('people').where('name', '==', this.$route.params.name).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.name = doc.data().name
        this.birthDay = doc.data().birthDay
        this.birthMonth = doc.data().birthMonth
        this.year = doc.data().year
      })
      }
    )}
  }
}
</script>

<style scoped>

</style>

<template>
<p>test</p>
</template>

<script>
import db from '../firebase/firebaseInit.js';

export default {
  name: 'viewPerson',
  methods: {
  },

  created() {
  },

  watch: {
    '$route': 'fetchData'
  },
  methods: {

  }
}
</script>

<style scoped>

</style>

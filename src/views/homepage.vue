<template>
<div>
  <h1>Next birthday:</h1>
  <person></person>
  <router-link to="/addPerson">Add Person</router-link>
  <router-link to="/catalog">Catalog</router-link>
</div>
</template>

<script>
import person from '../components/person';
import { mapState } from 'vuex'

export default {
  components: {
    'person': person,
  },
  name: 'homepage',

  computed: {
  ...mapState([
    'friends'
  ]),
},
}
</script>

<style scoped>

h1 {
  font-size: 2em;
  margin: 20px;
}
</style>

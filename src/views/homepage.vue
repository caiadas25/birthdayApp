<template>
<div>
  <h1>Next birthday:</h1>
  <person></person>
</div>
</template>

<script>
import person from '../components/person';
import navbar from '../components/navbar';
import { mapState } from 'vuex'

export default {
  components: {
    'person': person,
    'navbar': navbar,
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

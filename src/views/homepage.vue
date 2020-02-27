<template>
<div>
  <h1>Next birthday:</h1>
  <button>
    <router-link to="/">teste</router-link>
  </button>
  <person></person>
  <router-link to="/addPerson">Add Person</router-link>
</div>
</template>

<script>
import person from '../components/person';
export default {
  components: {
    'person': person,
  },
  name: 'homepage',
  data () {
    return {
    }
  }
}
</script>

<style scoped>

h1 {
  font-size: 2em;
  margin: 20px;
}
</style>

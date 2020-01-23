<template>
<div>
  <h1>Next birthday:</h1>
  <person></person>
  <button>
    <router-link to="/">teste</router-link>
  </button>
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
  color: black;
}
</style>

<template>
<div>
  <h1>Next birthday:</h1>
  <ul>
    <li v-for="friend in friends">
      {{ friend.name }}
    </li>
  </ul>
  <person></person>
  <router-link to="/addPerson">Add Person</router-link>
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

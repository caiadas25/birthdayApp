<template>
<div>
  <h1>Next birthday:</h1>
  <ul>
    <li v-for="person in people">
      {{ person.name }}
    </li>
  </ul>
  <person></person>
  <router-link to="/addPerson">Add Person</router-link>
</div>
</template>

<script>
import person from '../components/person';
import { buildObject } from '../fetchDataService';
import { errData, obtainData } from '../firebase/firebaseInit';

export default {
  components: {
    'person': person,
  },
  name: 'homepage',

  data () {
    return {
      people: [],
    }
  },
  async created() {
    const firebaseData = await obtainData();
    this.people = buildObject(firebaseData);
  }
}
</script>

<style scoped>

h1 {
  font-size: 2em;
  margin: 20px;
}
</style>

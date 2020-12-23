<template>
<div>
  <ul class="catalog-container">
    <li v-for="friend in friends" class="border">
        <person
          :birthMonth="friend.birthMonth"
          :birthDay="friend.birthDay"
          :name="friend.name"
          :photo="friend.photo"></person>
    </li>
  </ul>
  <router-link to="/" >Back</router-link>
</div>
</template>

<script>
import person from '../components/person';
import { mapState } from 'vuex'

export default {
  name: 'catalog',
  components: {
    'person': person,
  },
  methods: {
  },
  computed: {
    ...mapState([
      'friends'
    ])
  },
  created() {
  },


  methods: {

  }
}
</script>

<style scoped>
.catalog-container {
  width: 50%;
  margin: 0 auto;
}
.border{
  border: 2px solid green;
  width: max-content;
  padding: 5px;
}
</style>

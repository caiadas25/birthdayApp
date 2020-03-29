<template>
<div>
  <ul>
    <li v-for="friend in friends" class="border">
      {{ friend.name }}
    </li>
  </ul>
  <router-link to="/" >Back</router-link>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'catalog',
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
.border{
  border: 2px solid green;
  width: max-content;
  padding: 5px;
  margin: 10px auto;
}
</style>

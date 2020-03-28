<template>
<div>
  <ul>
    <li v-for="friend in friends">
      {{ friend.name }}
    </li>
  </ul>
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

</style>

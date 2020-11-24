<template>
  <div class="person-container"
      v-if="this.friends.length !== 0">
      <div class="person-date-element">
        {{birthDay}} of {{birthMonth}}
      </div>
      <div class="person-date-element">
        {{name}}
      </div>
  </div>
</template>
<script>
import db from '../firebase/firebaseInit.js';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'person',
  computed: {
    ...mapGetters([
      'getData'
    ]),
    ...mapState([
      'friends'
    ]),
    ...mapActions([
    ])
  },
  props: ['name', 'birthDay', 'birthMonth'],

  methods: {

  },

  created(){
    this.$store.dispatch('obtainData')
  }
}
</script>

<style scoped>

.person-container {
  display: flex;
  height: 300px;
  width: 300px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: black;
  border: 7px solid green;
  border-radius: 20px;
  margin: 0 auto;
}
.person-date-element {
  font-size: 2em;
}
</style>

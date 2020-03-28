<template>
  <div class="person-container"
      v-if="this.friends.length !== 0">
      <div class="person-date-element">
        {{friends[0].birthDay}} of {{friends[0].birthMonth}}
      </div>
      <div class="person-date-element">
        {{friends[0].name}}
      </div>
      <div>{{friends[0]}}</div>
  </div>
</template>
<script>
import db from '../firebase/firebaseInit.js';
import { database, ref } from '../firebase/firebaseInit';
import { errData, obtainData } from '../firebase/firebaseInit';
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  buildObject
  } from '../fetchDataService';


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

  methods: {

  },

  //created() {
  //  obtainData()
  //   .then(firebaseData => this.people = firebaseData)
  //    .then(firebaseData => this.getDatesAsMiliseconds(firebaseData))
  //    .then(allDatesInMiliseconds => this.getDaysInTheFuture(allDatesInMiliseconds))
  //    .then(datesInFutureInMiliseconds => this.convertMilisecondsToDate(datesInFutureInMiliseconds))
  //    .then(parsedDates => this.parsedDates = parsedDates)
  //    .then(firebaseData => this.buildObject(firebaseData));
  //},


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

<template>
  <div class="person-container"
      v-if="this.people.length !== 0">
      <div class="person-date-element">
        {{this.people[0].birthDay}} of {{this.people[0].birthMonth}}
      </div>
      <div class="person-date-element">
        {{this.people[0].name}}
      </div>
  </div>
</template>
<script>
import db from '../firebase/firebaseInit.js';
import { database, ref } from '../firebase/firebaseInit';
import { errData, obtainData } from '../firebase/firebaseInit';
import {
  getDatesAsMiliseconds,
  getDaysInTheFuture,
  convertMilisecondsToDate,
  parseDates,
  allDates,
  getCurrentDayInDateFormat,
  isPropertyEmpty,
  buildObject
  } from '../fetchDataService';


export default {
  name: 'person',
  methods: {

  },
  data () {
    return {
      people: [],
    }
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

  async created() {
    const firebaseData = await obtainData();
    const datesAsMiliseconds = getDatesAsMiliseconds(firebaseData);
    const datesInFutureInMiliseconds = getDaysInTheFuture(datesAsMiliseconds);
    const parsedDates = convertMilisecondsToDate(datesInFutureInMiliseconds);
    this.people = buildObject(firebaseData);
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

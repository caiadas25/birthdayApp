<template>
  <div class="person-container"
      v-if="this.people.length !== 0">
      <div class="person-date-element">
        {{this.people[0].birthDay}}/{{this.people[0].birthMonth}}
      </div>
      <div class="person-date-element">
        {{this.people[0].name}}
      </div>
      <!--<div class="person-date-element">
        <ul>
            <li v-for="value in people">
              {{ value.name + value.parsed}}
            </li>
        </ul>
      </div>-->
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
  isPropertyEmpty
  } from '../functions';


export default {
  name: 'person',
  methods: {

    isCurrentDayInTheList(currentDay, list) {
      return this.allDates(list).getTime() === currentDay.getTime();
    },

    buildObject(firebaseData){
      for (let i = 0; i < firebaseData.length; i++) {
        let birthDay = firebaseData[i].birthDay;
        let birthMonth = firebaseData[i].birthMonth;
        let name = firebaseData[i].name;
        let formattedBirthDate = birthDay + '/' + birthMonth;
        firebaseData[i].birthdaysInMiliseconds = getDatesAsMiliseconds(formattedBirthDate);
        firebaseData[i].birthdaysInFuture = getDaysInTheFuture(firebaseData[i].birthdaysInMiliseconds);
        firebaseData[i].converted = convertMilisecondsToDate(firebaseData[i].birthdaysInFuture);
        firebaseData[i].parsed = parseDates(firebaseData[i].converted);
        //if "converted" property is empty (meaning the date is in the past, give it a huge value so that it goes
        //to the end of the list with the "sortedObjects" parsing function)
        if (isPropertyEmpty(firebaseData[i].converted) && !(allDates(firebaseData[i].birthdaysInMiliseconds).getTime() === getCurrentDayInDateFormat().getTime())){
           firebaseData[i].converted = 9999999999999999
        }
        console.log((allDates(firebaseData[i].birthdaysInMiliseconds)).getTime() === getCurrentDayInDateFormat().getTime())
      }
      let sortedObjects = firebaseData.sort((a, b) => (a.converted > b.converted) ? 1 : -1)
      console.log(firebaseData)

      return firebaseData;
    },
  },

  data () {
    return {
      parsedDates: [],
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
    this.people = this.buildObject(firebaseData);
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

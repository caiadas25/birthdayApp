<template>
  <div class="person-container"
      v-if="!(parsedDates.length === 0)">
      {{this.getClosestDate(parsedDates)}}
      {{this.people}}
  </div>
</template>
<script>
import db from '../firebase/firebaseInit.js';
import { database, ref } from '../firebase/firebaseInit';
import { errData, obtainData } from '../firebase/firebaseInit';


export default {
  name: 'person',
  methods: {
    dateString() {
      return 'name';
    },

    getDatesAsMiliseconds(firebaseData){
      console.log(firebaseData)

      let birthDayAndBirthMonth = [];

      for (let i = 0; i < firebaseData.length; i++) {
        let birthDay = firebaseData[i].birthDay;
        let birthMonth = firebaseData[i].birthMonth;
        let name = firebaseData[i].name;
        let formattedBirthDate = birthDay + '/' + birthMonth;
        birthDayAndBirthMonth.push(formattedBirthDate);
      }

      console.log(birthDayAndBirthMonth);
      let datesToProcess = (birthDayAndBirthMonth).map(s => {
        let datesAsMiliseconds = (moment(s, "DD/MM")._d.getTime()) - Date.now();
        return datesAsMiliseconds;
      });
      let datesAsMiliseconds = datesToProcess;
      return datesAsMiliseconds;
    },



    getDaysInTheFuture(datesAsMiliseconds) {
      //let datesAsMiliseconds = this.getDatesAsMiliseconds();
      function getPositiveNumbers(array) {
        return array.filter(value => value > 0);
      }
      let daysInTheFuture = getPositiveNumbers(datesAsMiliseconds);
      return daysInTheFuture;
    },

    convertMilisecondsToDate(datesInFutureInMiliseconds) {
      // let datesInFutureInMiliseconds = this.getDaysInTheFuture();
      const converted = datesInFutureInMiliseconds.map(n => n + Date.now());
      const sorted = converted.sort();
      const parsed = sorted.map(n => moment(n).format("DD/MM"));
      return parsed;
    },

    getClosestDate(parsedDates) {
      // return this.convertMilisecondsToDate()[0];
      console.log(parsedDates[0]);
      return parsedDates[0];
    }
  },

  data () {
    return {
      parsedDates: [],
      people: [],
    }
  },
  created() {
    obtainData()
      .then(firebaseData => this.people = firebaseData)
      .then(firebaseData => this.getDatesAsMiliseconds(firebaseData))
      .then(datesAsMiliseconds => this.getDaysInTheFuture(datesAsMiliseconds))
      .then(datesInFutureInMiliseconds => this.convertMilisecondsToDate(datesInFutureInMiliseconds))
      .then(parsedDates => this.parsedDates = parsedDates);
      // .then(parsedDates => this.getClosestDate(parsedDates));
     // this.getClosestDate();
  },

  //async created2() {
  //  const firebaseData = await obtainData2();
  //  const datesAsMiliseconds = this.getDatesAsMiliseconds(firebaseData);
  //  const datesInFutureInMiliseconds = this.getDaysInTheFuture(datesAsMiliseconds);
  //  const parsedDates = this.convertMilisecondsToDate(datesInFutureInMiliseconds);

  //  this.parsedDates = parsedDates;
  //}
}
</script>

<style scoped>

.person-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.person {
  width: 230px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: blue;
  color: white;
}
</style>

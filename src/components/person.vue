<template>
  <div class="person-container"
      v-if="!(parsedDates.length === 0)">
      {{this.people[0].birthDay}}/{{this.people[0].birthMonth}}, {{this.people[0].name}} ---->{{this.people[0].parsed}}
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

    buildObject(firebaseData){
      //console.log(firebaseData)
      return firebaseData
    },

    getDatesAsMiliseconds(firebaseData){
      //console.log(sortedObjects)
      let birthDayAndBirthMonth = [];

      for (let i = 0; i < firebaseData.length; i++) {
        let birthDay = firebaseData[i].birthDay;
        let birthMonth = firebaseData[i].birthMonth;
        let name = firebaseData[i].name;
        let data = firebaseData[i].data;
        let formattedBirthDate = birthDay + '/' + birthMonth;
        //add dataFormatada property to all objects
        firebaseData[i].dataFormatada = formattedBirthDate;
        birthDayAndBirthMonth.push(formattedBirthDate);

        //subtract the current time to the list of dates to find the dates in the past, so that we can filter them out.
        firebaseData[i].birthdaysInMiliseconds = [formattedBirthDate].map(s => {
          let datesAsMiliseconds = (moment(s, "DD/MM/YYYY")._d.getTime()) - Date.now();
          return datesAsMiliseconds;
        });
        firebaseData[i].birthdaysInFuture = firebaseData[i].birthdaysInMiliseconds.filter(value => value > 0);
        firebaseData[i].converted = firebaseData[i].birthdaysInFuture.map(n => n + Date.now());
        firebaseData[i].parsed = firebaseData[i].converted.map(n => moment(n).format("DD/MM/YYYY"));
        if (firebaseData[i].converted.length === 0){
           firebaseData[i].converted = 9999999999999999
        }
      }

      let sortedObjects = firebaseData.sort((a, b) => (a.converted > b.converted) ? 1 : -1)


      console.log(firebaseData)
      console.log(birthDayAndBirthMonth);


      let datesToProcess = (birthDayAndBirthMonth).map(s => {
        let datesAsMiliseconds = (moment(s, "DD/MM/YYYY")._d.getTime()) - Date.now();
        return datesAsMiliseconds;
      });


      let datesAsMiliseconds = datesToProcess;
      console.log(datesToProcess)

      return datesAsMiliseconds;
    },

    getDaysInTheFuture(datesAsMiliseconds) {
      //let datesAsMiliseconds = this.getDatesAsMiliseconds();
      //this checks if the value in milisseconds is positive(in the future), or negative(in the past), and filters just the positive values
      let daysInTheFuture = datesAsMiliseconds.filter(value => value > 0);
      console.log(daysInTheFuture)
      return daysInTheFuture;
    },

    convertMilisecondsToDate(datesInFutureInMiliseconds) {
      // let datesInFutureInMiliseconds = this.getDaysInTheFuture();
      const converted = datesInFutureInMiliseconds.map(n => n + Date.now());
      const sorted = converted.sort();
      const parsed = sorted.map(n => moment(n).format("DD/MM/YYYY"));
      console.log(parsed)
      return parsed;
    },
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
      .then(parsedDates => this.parsedDates = parsedDates)
      .then(firebaseData => this.buildObject(firebaseData));
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
  color: white
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

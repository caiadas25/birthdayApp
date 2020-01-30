<template>
  <div class="person-container">
      Closest birthday is: {{this.getClosestDate()}}
    <div class="person" v-for= "person in people" :key="person.id">
      {{person.birthDay}}
      {{person.birthMonth}}
    <router-link :to="{name: 'viewPerson', params: {name: person.name}}">
      <div>
        Ver pessoa
      </div>
    </router-link>
    </div>
  </div>
</template>
<script>
import db from '../firebase/firebaseInit.js';

export default {
  name: 'person',
  methods: {
    dateString() {
      return 'birthMonth';
    },
    getData(){
      db.collection('people').orderBy(this.dateString()).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'birthDay': doc.data().birthDay,
            'birthMonth': doc.data().birthMonth,
            'birthYear': doc.data().birthYear,
            'date': doc.data().date,
          }
          this.people.push(data);
          let formattedBirthday = doc.data().birthDay + '/' + doc.data().birthMonth;
          return data;
        })
      })
    },

    getDatesAsMiliseconds(){

      let dates = ["05/01", "01/01", "27/01", "22/12", "12/11", "03/04", "10/02", "08/08",].map(s => {
        let datesAsMiliseconds = (moment(s, "DD/MM")._d.getTime()) - Date.now();
        //console.log(datesAsMiliseconds)
        return datesAsMiliseconds;
      });
      let datesAsMiliseconds = dates;
      return datesAsMiliseconds;
    },

    getDaysInTheFuture() {
      let datesAsMiliseconds = this.getDatesAsMiliseconds();
      function getPositiveNumbers(array) {
        return array.filter(value => value > 0);
      }
      let daysInTheFuture = getPositiveNumbers(datesAsMiliseconds);
      return daysInTheFuture;
    },
    convertMilisecondsToDate() {
      let datesInFutureInMiliseconds = this.getDaysInTheFuture();
      const converted = datesInFutureInMiliseconds.map(n => n + Date.now());
      const sorted = converted.sort();
      const parsed = sorted.map(n => moment(n).format("DD/MM/YYYY"));
      console.log(parsed)
      return parsed;
    },
    getClosestDate() {
      //console.log(this.convertMilisecondsToDate()[0]);
      return this.convertMilisecondsToDate()[0];
    }
  },

  data () {
    return {
      people: []
    }
  },
  created() {
    this.getDatesAsMiliseconds();
    this.getData();
    this.getDaysInTheFuture();
    this.convertMilisecondsToDate();
    this.getClosestDate();
  },
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

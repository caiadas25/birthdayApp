<template>
  <div class="person-container">
    <div class="person" v-for= "person in people" :key="person.id">
      {{person.name}},
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
<script src="moment.js"></script>
<script>
import db from '../firebase/firebaseInit.js';

export default {
  name: 'person',
  methods: {
    dateString() {
      return 'birthMonth';
    },
    getData(){
      db.collection('people').orderBy(this.dateString()).limit(9).get().then(querySnapshot => {
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
          return data;
        })
      })
    },
    getClosestDateToCurrentDate() {
      const dates = [
        '2/3/3000',
        '7/5/3000',
        '1/21/3000',
        '2/19/3000',
        '7/1/3000',
        '10/22/3000',
        '08/12/3000',
      ];

      const now = new Date();
      let closest = Infinity;

      dates.forEach(function(d) {
        const date = new Date(d);
        if (date >= now && (date < new Date(closest) || date < closest)) {
          console.log('tasfas' + closest)
            closest = d;
        }
      });
    },
    getClosestDateToCurrentDate2() {
      var next = [
        "05/01",
        "10/02",
        "10/09",
        "10/03"
      ].map(function(s){
        return moment(s, "DD/MM");
      })
      .sort(function(m){
        return m.valueOf();
      })
      .find(function(m){return m.isAfter();});

      if (next) {
        console.log("Next time is", next.format("DD/MM"), "which is", next.fromNow());
      }
    }
  },

  data () {
    return {
      people: []
    }
  },
  created() {
    this.getClosestDateToCurrentDate2();
    this.getData();
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

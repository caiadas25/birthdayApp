<template>
<div>
  <h1>Next birthday:</h1>
  <!--Create a v-for for the "person" component to display more than one when applicable-->
  <person :birthMonth="this.getBirthMonthOfFirstFriend()"
          :birthDay="this.getBirthDayOfFirstFriend()"
          :name="this.getNameOfFirstFriend()"></person>

</div>
</template>

<script>
import person from '../components/person';
import navbar from '../components/navbar';
import { mapState } from 'vuex'

export default {
  components: {
    'person': person,
    'navbar': navbar,
  },
  data: function() {
    return {
      persons: [
        ['hello'],
        ['goodbye']
      ],
      count: 2,
    }
  },

  props: {
  },

  name: 'homepage',

  computed: {
  ...mapState([
    'friends'
    ]),

  },
  methods: {

    showNamesOfSameBirthdays() {
      let friendsConvertedValues = this.getConvertedValues();
      let friends = this.friends;
      let filteredFriends = friends.filter(item => (friends.converted == '1609286400000'));
      //not working
      return filteredFriends;
    },
    getBirthMonthOfFirstFriend() {
      let friends = this.friends;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].birthMonth) {
            return friends[i].birthMonth;
        }
      }
    },
    getNameOfFirstFriend() {
      let friends = this.friends;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].name) {
            return friends[i].name;
        }
      }
    },
    getBirthDayOfFirstFriend() {
      let friends = this.friends;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].birthDay) {
            return friends[i].birthDay;
        }
      }
    },
    getConvertedValues() {
      const result = this.friends.map(a => a.converted);
      let filtered = result.filter(function (el) {
        return el != 10000000000000000;
      });
      let flatArray = filtered.flat();
      return flatArray;
    },
    checkIfFirstValueEqualsTheSecondValue() {
      let array = this.getConvertedValues();
      for(var i = 0; i < array.length - 1; i++) {
          if(array[i] === array[i+1]) {
            console.log(i);
            return true;
          }
      }
      return false;
    },
    getNumberOfIdenticalConvertedValues() {
      let convertedValues = this.getConvertedValues();
      var map = new Map();
      convertedValues.forEach(a => map.set(a, (map.get(a) || 0) + 1));
      return convertedValues.filter(a => map.get(a) > 1).length;
      }
    },
}
</script>

<style scoped>

h1 {
  font-size: 2em;
  margin: 20px;
}
</style>

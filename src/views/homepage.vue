<template>
<div>
  <h1>{{getHeadline()}}</h1>
  <!--Create a v-for for the "person" component to display more than one when applicable-->
  <person v-if="this.firstFriendHasEmptyParsedDate()"
          :birthMonth="this.getBirthMonthOfFirstFriend()"
          :birthDay="this.getBirthDayOfFirstFriend()"
          :name="this.getNameOfFirstFriend()"
          :photo="this.getPhotoOfFirstFriend()"></person>
</div>
</template>

<script>
import person from '../components/person';
import navbar from '../components/navbar';
import { mapState, mapGetters, mapActions } from 'vuex'

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
    getHeadline() {
      return this.firstFriendHasEmptyParsedDate() ? 'Next birthday:' : 'No more birthdays this year :(';
    },

    //meaning that there are no more birthdays this year.
    firstFriendHasEmptyParsedDate(){
      let friends = this.friends;
      return friends[0].parsed.length ? true : false;
    },

    getPhotoOfFirstFriend() {
      let friends = this.friends;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].photo) {
            return friends[i].photo;
        }
      }
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

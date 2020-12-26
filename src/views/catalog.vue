<template>
<div>
  <ul class="catalog-container">
    <li v-for="friend in friends" v-bind:key="friend['.key']" class="border">
        <person
          :birthMonth="friend.birthMonth"
          :birthDay="friend.birthDay"
          :name="friend.name"
          :photo="friend.photo"></person>
          <button @click="removeFriend(friend.name)">Remove</button>
    </li>
  </ul>
  <router-link to="/" >Back</router-link>
</div>
</template>

<script>
import person from '../components/person';
import { mapState } from 'vuex'
import friendsRef from '../firebase/firebaseInit';
import db from '../firebase/firebaseInit.js';

export default {
  name: 'catalog',
  components: {
    'person': person,
  },
  firebase: {
    friends: friendsRef,
  },
  methods: {
  },
  computed: {
    ...mapState([
      'friends'
    ])
  },
  created() {
  },


  methods: {
    removeFriend(friendName) {
      //finds the friend with the attribute "name" which matches the name of the friend we want to delete.
      db.collection('people').where('name', '==', friendName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete()
          //fetches the list of friends again to display the updated list
          .then(this.$store.dispatch('obtainData'))
          .then(alert('Friend successfully removed!'))
        })
      })
    },

  }
}
</script>

<style scoped>
.catalog-container {
  width: 50%;
  margin: 0 auto;
}
.border{
  border: 2px solid green;
  width: max-content;
  padding: 5px;
}
</style>

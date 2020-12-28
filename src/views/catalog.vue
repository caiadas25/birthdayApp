<template>
<div>
  <ul class="catalog-container">
    <li v-for="friend in friends" v-bind:key="friend['.key']" class="border">
        <div v-if="friendIdentifier === friend.name">
        <form @submit.prevent="addPerson" class="form">
          <div class="form-item">
            <label class="form-label">Nome: </label>
            <input type="text" v-model="editedFriend.name">
          </div>
          <div class="form-item">
            <label class="form-label">URL: </label>
            <input type="text" v-model="editedFriend.photo">
          </div>
          <div class="form-item">
            <label class="form-label">Dia: </label>
            <select v-model="editedFriend.birthDay">
              <option v-for="birthDay in birthDays" :key="birthDay">
                {{ birthDay }}
              </option>
            </select>
          </div>
          <div class="form-item">
            <label class="form-label">Mês: </label>
            <select v-model="editedFriend.birthMonth">
              <option v-for="birthMonth in birthMonths" :key="birthMonth">
                {{ birthMonth }}
              </option>
            </select>
          </div>
        </form>
          <button @click="onEditSubmit()">confirm</button>
          <button @click="onCancel(friend.name)">cancel</button>
        </div>
        <person v-else
          :birthMonth="friend.birthMonth"
          :birthDay="friend.birthDay"
          :name="friend.name"
          :photo="friend.photo"></person>
          <div v-if="!(friendIdentifier === friend.name)">
            <button @click="onEdit(friend)">Edit</button>
            <button @click="onRemove(friend.name)">Remove</button>
          </div>
    </li>
  </ul>
  <router-link to="/" >Back</router-link>
</div>
</template>

<script>
import person from '../components/person';
import addPerson from '../components/addPerson';
import { mapState } from 'vuex'
import db from '../firebase/firebaseInit.js';

export default {
  name: 'catalog',
  data: function() {
    return {
      birthDays: this.generateDays(31),
      birthMonths: this.generateMonths(12),
      friendIdentifier: '',
      editedFriend: {
          name: '',
          birthDay: '',
          birthMonth: '',
          photo: '',
      }
    }
  },
  components: {
    'person': person,
    'addPerson': addPerson,
  },
  computed: {
    ...mapState([
      'friends'
    ])
  },
  methods: {
    generateDays(numberOfDays){
      return [...Array(numberOfDays + 1 ).keys()]
    },
    generateMonths(numberOfMonths){
      return  ([...Array(numberOfMonths).keys()]).map(function(num) {
          return moment().month(num).format("MMMM")
      })
    },
    onRemove(friendName) {
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
    //edit mode functions
    onEdit(friend) {
      this.friendIdentifier = friend.name;
      this.editedFriend.name = friend.name
      this.editedFriend.photo = friend.photo
      this.editedFriend.birthDay = friend.birthDay
      this.editedFriend.birthMonth = friend.birthMonth
    },
    onCancel() {
      this.friendIdentifier = '';
      this.editedFriend.name = '';
      this.editedFriend.photo = '';
      this.editedFriend.birthDay = '';
      this.editedFriend.birthMonth = '';
    },
    onEditSubmit() {
        db.collection('people').where('name', '==', this.friendIdentifier).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.set({
            name: this.editedFriend.name,
            photo: this.editedFriend.photo,
            birthDay: this.editedFriend.birthDay,
            birthMonth: this.editedFriend.birthMonth,
          })
          //fetches the list of friends again to display the updated list
          .then(alert('Friend successfully edited!'))
          .then(this.$store.dispatch('obtainData'))
        })
      })
    }
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

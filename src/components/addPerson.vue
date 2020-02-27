<template>
  <div id="new-restaurant">
    <h3>Nova pessoa</h3>
    <div class="form-wrapper">
      <form @submit.prevent="addPerson" class="form">
        <label>Nome</label>
        <input type="text" v-model="newPerson.name">

        <label>BirthDay: </label>
        <input type="text" v-model="newPerson.birthDay" required>
        <label>BirthMonth: </label>
        <input type="text" v-model="newPerson.birthMonth" required>

        <div class="action-buttons">
          <button type="submit" class="submit-btn">Submeter</button>
          <router-link to="/" class="cancel-btn">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import db from '../firebase/firebaseInit.js';
import { database, ref } from '../firebase/firebaseInit';
export default {

  name: 'addPerson',
  methods: {
    addPerson () {
      db.collection('people').add({
        name: this.newPerson.name,
        birthDay: this.newPerson.birthDay,
        birthMonth: this.newPerson.birthMonth,
      })
      .then(this.$router.push('/'))
    },
  },
data () {
    return {
      newPerson: {
          name: '',
          birthDay: '',
          birthMonth: ''
      }
    }
  },

}


</script>
<style scoped>

</style>

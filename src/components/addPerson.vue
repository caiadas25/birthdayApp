<template>
  <div id="new-restaurant">
    <h3>Nova pessoa</h3>
    <div class="form-wrapper">
      <form @submit.prevent="addPerson" class="form">

        <label>Nome</label>
        <input type="text" v-model="newPerson.name">

        <label>Dia: </label>
        <select v-model="newPerson.birthDay">
          <option v-for="birthDay in birthDays" :key="birthDay">
            {{ birthDay }}
          </option>
        </select>

        <label>Mês: </label>
        <select v-model="newPerson.birthMonth">
          <option v-for="birthMonth in birthMonths" :key="birthMonth">
            {{ birthMonth }}
          </option>
        </select>

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
    generateDays(numberOfDays){
      return [...Array(numberOfDays + 1 ).keys()]
    },
    generateMonths(numberOfMonths){
      return  ([...Array(numberOfMonths).keys()]).map(function(num) {
          return moment().month(num).format("MMMM")
      })
    },
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
      birthDays: this.generateDays(31),
      birthMonths: this.generateMonths(12),
      newPerson: {
          name: '',
          birthDay: '',
          birthMonth: ''
      }
    }
  },
  created() {
  }
}

</script>
<style scoped>

</style>

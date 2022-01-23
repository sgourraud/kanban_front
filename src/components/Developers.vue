<template>
  <div>
    <div>
      <h1>Developers</h1>
    </div>
    <div>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Start Contract</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="developer in developers" :key="developer.id">
            <td>{{developer.firstname}} {{developer.lastname}}</td>
            <td>{{developer.email}}</td>
            <td>{{developer.startContract}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Developers',
  data: () => ({
    developers: null,
  }),
  created() {
    axios.get("http://localhost:8080/developers").then((result) => {
      this.developers = result.data
          })
  }
}
</script>
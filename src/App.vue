<template>
  <div>
    <Header :prAuth="auth"/>
    <body>
      <router-view />
    </body>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '@/components/Header'
import firebase from '@/firebase/firestore.js'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      user: {},
      auth: false
    }
  },
  watch: {
    user: function (newVal) {
      if(!newVal) {
        console.log('ユーザ取得')
        this.auth = false
      } else {
        this.auth = true
      }
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user? user : {}
    })
  }
}
</script>

<style scoped>
@import 'css/main.css';


</style>

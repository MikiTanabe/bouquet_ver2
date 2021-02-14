<template>
  <div>
    <Header />
    <body>
      <div class="container">
        <div class="pt-3">
          <router-view />
        </div>
      </div>
    </body>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
  @import 'css/main.css';
</style>

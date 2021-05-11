<template>
  <div id="title">
    <Header />
    <div class="container">
        <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  @import 'css/main.css';
  @import 'css/scroll.css';
</style>

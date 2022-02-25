<template>
  <div id="app">
      <Header/>
      <!-- <router-link to="/about">About</router-link> -->   
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
}
</script>

<style>

</style>

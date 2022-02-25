<template>
  <div>
    <!-- <div class="header">
  <router-link style="text-decoration: none; color:#DDC289;" to="/">KKBOX OPEN API</router-link>
</div> -->
    <nav class="navbar navbar-expand-lg navbar-light ">
      <div class="container">
        <router-link style="text-decoration: none; color:#DDC289;" to="/"
          >KKBOX－音樂試聽</router-link
        >
        <!-- <a class="navbar-brand" href="/">KKBOXOPENAPI</a> -->

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="搜尋"
              aria-label="Search"
              v-model="searchInput"
            />
            <router-link class="btn" @click.native="search" :to="{name:'Search',query:{search:searchInput}}">Search</router-link>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name:"v-header",
  data(){
    return{
      searchInput:"",
    };
  },
  methods:{
    search(){
    location.reload();
    }

  }
}
</script>


<style scoped>
/* .header {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 50px;
  color: #DDC289;
  background-color: #4B4D54;
  height: 80px;
  text-align: center;
  line-height: 80px;
  position: sticky;
  top: 0;
  z-index: 1;
} */
.navbar {
  background-color: #4b4d54;
  font-size: 38px;
  font-weight: 900;
}
.navbar-brand {
  color: #ddc289;
}
.d-flex {
  margin-left: auto;
}
.btn {
  border: #e1ab00 solid 1px;
  color: #e1ab00;
}
.btn:hover {
  background-color: #e1ab00;
  color: #000000;
}
</style>

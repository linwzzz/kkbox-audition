<template>
  <div>
    <div id="scrollspyHeading1"><Featured /></div>
    <div id="scrollspyHeading2"><Newhits /></div>
    <div id="scrollspyHeading3"><Chars /></div>
  </div>
</template>

<script>
import Newhits from "@/components/newhits.vue";
import Featured from "@/components/featured.vue";
import Chars from "@/components/chars.vue";

export default {
  name: "Home",
  components: {
    Newhits,
    Featured,
    Chars,
  },
  data() {
    return {};
  },
};
</script>

<style>
/* @media (min-width: 1024px){
  .navbar-brand {
    display: none;
}
} */

* {
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  background-color: #ddc289;
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 1;
  border: #dfd7d7 solid 1px;
  font-size: 22px;
  font-weight: 500;
}
.nav-link {
  color: #000000;
}
a:hover {
  color: #ddc289;
}
input[type=text] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
  margin-left: 100px;
  width: 25%
}
.logo{
  width: 25%
}
</style>

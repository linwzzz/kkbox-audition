<template>
<div class="featured">
      <div class="container">
      <h1>Featured</h1>
      <div class="row">
        <div class="col-6 col-md-2 item" v-for="(item, index) in featuredData.slice(0, 12)" :key="index" > <router-link
          :to="{ path: '/FeaturedPlaylist', query: { playlistId: item.id,title:item.title } }"
          >
          <div class="image"><img :src="item.images[1].url" /></div>

          <div class="title">{{ item.title }}</div></router-link
        ></div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "featured",
  data() {
    return {
      token: "-kfmJ0iw_CHLEfmCa7T0gg==",
      featuredData: [],
    };
  },
  mounted() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.token} `,
      },
    };
    this.axios
      .get(
        "https://api.kkbox.com/v1.1/featured-playlist-categories?territory=TW",
        config
      )
      .then((response) => {
        // console.log(response);
        this.featuredData = response.data.data;
      });
  },
};
</script>

<style scoped>
.featured{
  padding: 0 0 50px 0;
}
h1 {
  font-size: 60px;
  color: #000000;
  padding: 20px 0px;
  font-weight: 700;
}
.col-md-1{
  flex-wrap: wrap;
}
.image{
  margin: 2px 4px;
}
img{
  width: 100%;
}
.item {
  position: relative;
  padding: 1px 0;
}
.item:hover .title {
  cursor: pointer;
  opacity: 1;
}
.title {
  /* width: 140px;
  height: 140px; */
  margin: 2px 4px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 28px;
  font-weight: 900;
  color: #E1AB00;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.7s;
}
</style>

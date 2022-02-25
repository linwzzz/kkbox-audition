<template>
  <div class="newhits">
    <div class="container">
      <h1>New Hits</h1>
      <div class="row">
        <div
          class="item col-12 col-md-3"
          v-for="(item, index) in newhitsData"
          :key="index"
        >
          <router-link
            style="text-decoration: none"
            :to="{ path: '/NewhitsPlaylist', query: { playlistId: item.id } }"
            ><img :src="item.images[1].url" />
            <div class="title">
              <h2>{{ item.title }}</h2>
            </div>
            <div class="text">{{ item.description }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "newhits",
  data() {
    return {
      token: "tXkxthFji9gYi1YIRqMIuQ==",
      newhitsData: [],
      id: [],
      newhitstop: [],
    };
  },
  mounted() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.token} `,
      },
    };
    this.axios
      .get("https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW", config)
      .then((response) => {
        // console.log(response);
        this.newhitsData = response.data.data;
      });
  },
};
</script>

<style scoped>
.newhits {
  background-color: #000000;
  padding: 0 0 50px 0;
}
h1 {
  font-size: 60px;
  color: #f8f9fa;
  font-weight: 700;
  padding: 20px 0px;
}
h2{
  font-weight: 700;
}
.row {
  padding: 0;
}
.item{
  padding: 15px;
}
.item:hover{
  background:rgba(107, 105, 105,0.5);
}
img {
  width: 100%;
}
.title {
  margin: 20px 0px;
  min-height: 80px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #C95635;
}
.text {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #adacac;
  min-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>

<template>
  <div class="featredplaylist">
    <div class="container">
      <div class="row">
        <div class="col-12"><h1>{{title}}</h1></div>
      </div>
      <div class="row">
        <div
          class="col-6 col-md-3  item"
          v-for="(item, index) in featuredlistData"
          :key="index" @click="getplayer(item.id)"
        >
          <img :src="item.images[0].url" alt="" />
          <div class="title">
            <a>{{ item.title }}</a>
          </div>
        </div>
      </div>
    </div>
    <iframe :src="playlistURL" allow="autoplay" ></iframe>
  </div>
</template>

<script>
export default {
  name: "Featured",
  data() {
    return {
      token: "tXkxthFji9gYi1YIRqMIuQ==",
      featuredlistData: [],
      playlistURL:"",
      playlistId:"",
      title:""
    };
  },
  mounted() {
    this.playlistId = this.$route.query.playlistId;
    this.title = this.$route.query.title;
    this.$nextTick(function() {
      this.getListid();
    });
  },
  methods: {
    getListid() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token} `,
        },
      };
      let a = `https://api.kkbox.com/v1.1/featured-playlist-categories/${this.playlistId}/playlists?territory=TW`;
      this.axios.get(a, config).then((response) => {
        // console.log(response);
        this.featuredlistData = response.data.data;
      });
    },
    getplayer(id){
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=playlist&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    }
  },
};
</script>

<style scoped>
.featredplaylist {
  margin: 50px;
}
h1{
  text-align: center;
  font-weight: 900;
  margin: 0 0 40px 0;
  position:relative;
}
img {
  width: 100%;
  box-shadow: 3px 3px 5px 6px #4B4D54;
  border-radius: 10px;
}
.item {
  margin: 10px 0;
}
.item :hover {
  cursor: pointer;
}
.title {
  font-weight: 500;
  font-size: 22px;
  height: 70px;
  margin: 5px 0;
  padding: 10px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  text-align: center; 
}
h1::before {
  content: ' ';
  border: rgba(201, 85, 53, 0.5) solid 10px ;
  position: absolute;
  right: 0;
  bottom: 30%;
  width: 40%;
  z-index: -1;
}
h1::after {
  content: ' ';
  border: rgba(201, 85, 53, 0.5) solid 10px ;
  position: absolute;
  left: 0;
  bottom: 30%;
  width: 40%;
  z-index: -1;
}
.title > a {
  background: linear-gradient(to left, #DDC289 50%, rgba(248,249,250,0.6) 50%) right;
  background-size: 200%;
  transition: 0.5s ease-out;
  color: #000000;
  text-decoration:none;
}
.item:hover a {
  background-position: left;
}
iframe{
  position: fixed;
  right: 10px;
  bottom: 10px;
  height: 60%;
}
</style>

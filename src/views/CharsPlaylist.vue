<template>
  <div class="charsplaylist">
    <div class="container">
      <div class="row title">
        <div class="col-8 col-md-10">
          <h1>{{ title }}</h1>
        </div>
        <div class="col-4 col-md-2">
          <button @click="getPlaylist(playlistId)">全部播放</button>
        </div>
      </div>
      <div class="row topthree">
        <div
          class="col-12 col-md-4"
          v-for="(item, index) in charslistData.slice(0, 3)"
          :key="index"
          @click="getsong(item.id)"
        >
          <div class="bg">
            <img :src="item.album.images[1].url" alt="" />
            <div class="song">
              <div class="number">{{ index + 1 }}</div>
              <div class="txt">
                <div class="songname">{{ item.name }}</div>
                <div class="arist">{{ item.album.artist.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row other">
        <div
          class="col-12 song"
          v-for="(item, index) in charslistData.slice(3, 25)"
          :key="index"
          @click="getsong(item.id)"
        >
          <p class="number">{{ index + 4 }}</p>
          <img :src="item.album.images[0].url" alt="" />
          <div class="txt">
            <p class="songname">{{ item.name }}</p>
            <p class="artist">{{ item.album.artist.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <iframe class="playlist" :src="playlistURL" allow="autoplay" v-if="playlist" ></iframe>
    <iframe class="song" :src="playlistURL" allow="autoplay" v-else ></iframe>
  </div>
</template>

<script>
export default {
  name: "CharsPlaylist",
  data() {
    return {
      token: "-kfmJ0iw_CHLEfmCa7T0gg==",
      playlist : true,
      playlistId: "",
      charslistData: [],
      title: "",
      playlistURL: "",
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
      let a = `https://api.kkbox.com/v1.1/charts/${this.playlistId}?territory=TW`;
      this.axios.get(a, config).then((response) => {
        // console.log(response);
        this.charslistData = response.data.tracks.data;
      });
    },
    getPlaylist(id){
      this.playlist = true
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=playlist&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    },
    getsong(id) {
      this.playlist = false
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=song&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    },
  },
};
</script>

<style scoped>
/* 標題 */
.title {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  margin: 50px 0 0 0;
}
button {
  background-color: #c95635;
  border: none;
  color: #f8f9fa;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
}
h1 {
  text-align: center;
  font-weight: 900;
  position: relative;
  
}
/* h1::before {
  content: " ";
  border: rgba(201, 85, 53, 0.8) solid 10px;
  position: absolute;
  right: 0;
  top: -35px;
  width: 100%;
  z-index: -1;
} */
/* h1::after {
  content: "1";
  border: rgba(201, 85, 53, 0.8) dashed  10px;
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 40%;
  z-index: -1;

} */
/* 前三名 */
.bg {
  box-shadow: 6px 6px 0 0 #39362d, 0 4px 20px 0 rgb(0 0 0 / 50%);
  border-radius: 10px;
}
.bg:hover {
  box-shadow: 10px 10px 0 0 #39362d, 0 4px 20px 0 rgb(0 0 0 / 50%);
  cursor: pointer;
  transition: box-shadow 0.5s;
}
.bg:hover .song {
  background: rgba(75, 77, 84, 0.8);
  color: #e1ab00;
}
.song {
  font-weight: 900;
}
.col-4 {
  /* padding: 0 10px; */
  justify-content: end;
}
.topthree{
  margin-bottom: 40px;
}
.topthree .song {
  display: flex;
  align-items: center;
  background: rgba(248, 249, 250, 0.3);
  color: #4b4d54;
  border-radius: 0 0 10px 10px;
  /* box-shadow: 6px 6px 0 0 #000000, 0 4px 20px 0 rgb(0 0 0 / 50%); */
}
.topthree img {
  width: 100%;
  border-radius: 10px 10px 0 0;
}
.number {
  font-size: 32px;
  margin: 0px;
  padding: 20px;
  width: 70px;
  text-align: center;
}
.other .song {
  display: flex;
  align-items: center;
  margin: 15px 0;
  background: rgba(248, 249, 250, 0.3);
  color: #4b4d54;
  border-radius: 10px;
  font-weight: 900;
  transition: box-shadow 0.5s;
  cursor: pointer;
  box-shadow: 6px 6px 0 0 #39362d, 0 4px 20px 0 rgb(0 0 0 / 50%);
}
.other .song:hover {
  background: rgba(75, 77, 84, 0.8);
  color: #e1ab00;
  box-shadow: 10px 10px 0 0 #39362d, 0 4px 20px 0 rgb(0 0 0 / 50%);
}
.other img {
  width: 100px;
  margin: 0 15px;
}
/* .other .number {
  font-size: 32px;
  margin: 0px;
  padding: 20px;
  width: 70px;
} */
.songname {
  font-size: 20px;
  margin: 0px;
  padding: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.other .artist {
  font-size: 16px;
  margin: 0px;
}
iframe {
  position: fixed;
  right: 10px;
  bottom: 10px;
  height: 102px;
}
/* 撥放器 */
iframe.playlist {
  position: fixed;
  right: 10px;
  bottom: 10px;
  height: 60%;
}
iframe.song {
  position: fixed;
  right: 10px;
  bottom: 10px;
  height: 102px;
}
.col-12{
  margin: 30px 0 0 0;
}
</style>

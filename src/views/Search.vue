<template>
  <div class="search">
    <!-- 選單切換 -->
    <div class="menu">
      <div :class="tracksCheck ? 'check' : 'button'" @click="tracks">
        歌曲
      </div>
      <div :class="albumsCheck ? 'check' : 'button'" @click="albums">
        專輯
      </div>
      <div :class="playlistsCheck ? 'check' : 'button'" @click="playlists">
        歌單
      </div>
    </div>
    <div class="container" >
      <!-- 歌曲 -->
      <div class="row" v-if="tracksCheck" >
        <div
          class="col-12 col-md-6 tracks"
          v-for="(item, index) in searchTracks"
          :key="index"
        >
          <div class="song" @click="gettracks(item.id)">
            <img :src="item.album.images[0].url" alt="" />
            <div class="txt">
              <p>{{ item.name }}</p>
              <p>{{ item.album.artist.name }}－{{ item.album.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 專輯 -->
      <div class="row" v-if="albumsCheck">
        <div
          class="col-6 col-md-2 albums"
          v-for="(item, index) in searchAlbums"
          :key="index"
        >
          <div class="song" @click="getalbums(item.id)">
            <img :src="item.images[0].url" alt="" />
            <p class="name">{{item.name}}</p>
            <p class="artist">{{item.artist.name}}</p>
          </div>
        </div>
      </div>
      <!-- 歌單 -->
      <div class="row" v-if="playlistsCheck">
        <div
          class="col-6 col-md-2 playlists"
          v-for="(item, index) in searchPlaylists"
          :key="index"
        >
          <div class="song" @click="getplaylists(item.id)">
            <img :src="item.images[0].url" alt="" />
            <p class="title">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="row" v-if="searchWord===''">
        <div class="col-12 error">
        <i class="material-icons md-18">error</i>
        <h1>請輸入一些關鍵字來搜尋你想要的歌曲、專輯或歌單</h1></div>
      </div>
      <div class="row" v-if="error">
        <div class="col-12 error">
        <i class="material-icons md-18">error</i>
        <h1>請輸入其他關鍵字來搜尋你想要的歌曲、專輯或歌單</h1></div>
      </div>
    </div>
    <iframe class="playlist" :src="playlistURL" allow="autoplay" v-if="playlist" ></iframe>
    <iframe class="song" :src="playlistURL" allow="autoplay" v-else ></iframe>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchWord: "",
      tracksCheck: true,
      playlistsCheck: false,
      albumsCheck: false,
      token: "-kfmJ0iw_CHLEfmCa7T0gg==",
      searchAlbums: [],
      searchArtists: [],
      searchPlaylists: [],
      searchTracks: [],
      playlistURL:"",
      playlist:true,
      error:true,
    };
  },
  mounted() {
    this.searchWord = this.$route.query.search;
    const config = {
      headers: {
        Authorization: `Bearer ${this.token} `,
      },
    };
    var url = `https://api.kkbox.com/v1.1/search?q=${this.searchWord}&territory=TW&limit=50&type=track,album,artist,playlist`;
    this.axios.get(url, config)
    .then((response) => {
      // console.log(response.data);
      this.searchAlbums = response.data.albums.data;
      this.searchPlaylists = response.data.playlists.data;
      this.searchTracks = response.data.tracks.data;
      this.error=false;
    })
    .catch(function (error) { // 请求失败处理
        console.log(error);
        this.error=true;
      });
  },
  methods: {
    tracks() {
      this.tracksCheck = true;
      this.albumsCheck = false;
      this.playlistsCheck = false;
    },
    albums() {
      this.tracksCheck = false;
      this.albumsCheck = true;
      this.playlistsCheck = false;
    },
    playlists() {
      this.tracksCheck = false;
      this.albumsCheck = false;
      this.playlistsCheck = true;
    },
    gettracks(id){
      this.playlist = false
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=song&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    },
    getalbums(id){
      this.playlist = true
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=album&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    },
    getplaylists(id){
      this.playlist = true
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=playlist&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    }
  },
};
</script>

<style scoped>

.material-icons{
  font-size: 52px;
}
.error{
  display: flex;
  color: #c95635;
  font-weight: bold;
  text-align: center;
}
.container {
  background-color: #f8f9fa;
  padding: 50px;
  margin: 0px auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; 
}
.menu {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
.menu .button {
  margin: 10px;
  padding: 15px 32px;
  border: solid 3px #e1ab00;
  background-color: #e1ab00;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
}
.menu .check {
  margin: 10px;
  padding: 15px 32px;
  border-radius: 30px;
  color: #ffffff;
  border: solid 3px #c95635;
  background-color: #c95635;
  font-size: 20px;
  font-weight: 900;
}
.tracks .song {
  display: flex;
  align-items: center;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #e1ab00;
}
.tracks .song:hover {
  background-color: rgba(255, 171, 0, 0.2);
  cursor: pointer;
}
.tracks img {
  width: 70px;
  height: 70px;
  margin: 0 10px;
}
.tracks p:nth-child(1) {
  font-size: 18px;
  margin: 0;
  color: #39362d;
  font-weight: bold;
}
.tracks p:nth-child(2) {
  font-size: 13px;
  margin: 0;
  color: #887f64;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.albums{
  padding: 10px;
}
.albums:hover{
  background: #e1ab00;
  cursor: pointer;
}
.albums .song img{
  width: 100%;
}
.albums .name{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
}
.albums .artist{
  font-size: 10px;
}
.playlists{
  padding: 10px;
}
.playlists:hover{
  background: #e1ab00;
  cursor: pointer;
}
.playlists .song img{
  width: 100%;
}
.playlists .title{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
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
</style>

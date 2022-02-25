<template>
  <div class="newhitsplaylist">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 left">
          <div v-for="(item, index) in newhitsData" :key="index">
            <div v-show="item.id == playlistId">
            <img :src="item.images[0].url" alt="" />
            <div class="title">{{ item.title }}</div>
            <div class="description">
              <h4>歌單介紹</h4>
              <p>{{ item.description }}</p>
            </div>
            <div class="owner">
              <img :src="item.owner.images[0].url" alt="" />
              <div class="txt">
                <h4>建立者</h4>
                <p>{{ item.owner.name }}</p>
              </div>
            </div>
            <div class="update">
              <h4>更新日期</h4>
              <p>{{ time(index) }}</p>
            </div>
          </div>
          </div>

        </div>

        <div class="col-12 col-md-8 right">
          <div class="title">
            <h4>完整曲目</h4>
            <button class="button" @click="getPlaylist(playlistId)">全部試聽</button>
          </div>
          <div class="song" v-for="(item, index) in newhitslistData" :key="'item-' + index" @click="getSong(item.id)">
            <img :src="item.album.images[0].url" alt="" />
            <div class="txt">
            <p>{{ item.name }}</p>
            <p>{{ item.album.artist.name }}－{{ item.album.name }}</p>
            </div>
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
  name: "Newhits",
  data() {
    return {
      token: "-kfmJ0iw_CHLEfmCa7T0gg==",
      newhitslistData: [],
      newhitsData: [],
      playlistId: "",
      playlistURL:"",
      playlist:false
    };
  },
  computed: {},
  mounted() {
    this.playlistId = this.$route.query.playlistId;
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
      let a = `https://api.kkbox.com/v1.1/new-hits-playlists/${this.playlistId}/tracks?territory=TW`;
      this.axios.get(a, config).then((response) => {
        // console.log(response);
        this.newhitslistData = response.data.data;
      });
      this.axios
        .get(
          "https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW",
          config
        )
        .then((response) => {
          // console.log(response);
          this.newhitsData = response.data.data;
        });
    },
    time(index) {
      return this.newhitsData[index].updated_at.substr(0, 10);
    },
    getPlaylist(id){
      this.playlist = true
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=playlist&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    },
    getSong(id){
      this.playlist = false
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=song&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
      
    }
  },
};
</script>

<style scoped>
.container{
  background-color: #f8f9fa;
  margin: 50px auto;
}
.row{
  padding: 50px;
}
.left .title{
  font-size: 28px;
  font-weight: 900;
  margin: 20px 0;
  color: #39362D;
}
.left img{
  width: 100%;
}
.left .owner{
  display: flex;
  margin: 15px 0;
}
.left .owner img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 0 8px 0 0;
}
.description {
  border: 1px solid #DDC289;
  border-radius: 10px;
  padding: 10px;
}
.owner h4,
.update h4,
.description h4 {
  color: #39362D;
  font-size: 14px;
  font-weight: 900;
}
.right .title{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.right .button{
  background-color: #E1AB00;
  border: none;
  color: #f8f9fa;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 25px;
  cursor: pointer;
}
.right .song{
  display: flex;
  align-items: center;
  padding: 10px 0 10px 0;
  border-bottom:1px solid #E1AB00;
}
.song:hover{
  background-color:rgba(255,171,0,0.2) ;
  cursor: pointer;
} 
.right img {
  width: 60px;
  height: 60px;
  margin: 0 15px;
}
.song p:nth-child(1){
  font-size: 16px;
  margin: 0;
  color: #39362D;
}
.song p:nth-child(2){
  font-size: 13px;
  margin: 0;
  color: #39362D;
}
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

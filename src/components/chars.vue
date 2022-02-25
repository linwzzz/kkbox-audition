<template>
  <div class="chars">
    <div class="container">
      <h1>Chars</h1>
      <div class="row hourly">
        <div class="col-12 ">
          <div class="title" v-for="(item, index) in hourly"
            :key="'title'+index">
            <h2>綜合新歌 TOP5</h2>
            <router-link
              style="text-decoration: none"
              :to="{ path: '/CharsPlaylist',query:{playlistId: item.id,title:item.title}}"
            >
              <button class="button">完整榜單</button>
            </router-link>
          </div>
          <div
            class="col-12 song"
            v-for="(item, index) in hourlyData.slice(0, 5)"
            :key="index"
            @click="getplayer(item.id)"
          >
            <p class="number">{{ index + 1 }}</p>
            <img :src="item.album.images[0].url" alt="" />
            <div class="txt" >
              <p class="songname">{{ item.name }}</p>
              <p class="artist">{{ item.album.artist.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row daily">
        <div class="col-12 title">
          <h2>新曲日榜</h2>
        </div>
        <div
          class="col-6 col-md-2 song"
          v-for="(item, index) in newdaily"
          :key="index"
        >
          <router-link
            style="text-decoration: none"
            :to="{ path: '/CharsPlaylist', query: { playlistId: item.id,title:item.title } }"
          >
            <img :src="item.images[0].url" alt="" />
            <p>{{ item.description }}</p>
          </router-link>
        </div>
      </div>
      <div class="row daily">
        <div class="col-12 title">
          <h2>單曲日榜</h2>
        </div>
        <div
          class="col-6 col-md-2 song"
          v-for="(item, index) in songdaily"
          :key="index"
        >
          <router-link
            style="text-decoration: none;"
            :to="{ path: '/CharsPlaylist', query: { playlistId: item.id,title:item.title } }"
          >
            <img :src="item.images[0].url" alt="" />
            <p>{{ item.description }}</p>
          </router-link>
        </div>
      </div>
      <div class="row weekly">
        <div class="col-12 title">
          <h2>曲風週榜</h2>
        </div>
        <div
          class="col-6 col-md song "
          v-for="(item, index) in songweekly.slice(0, 5)"
          :key="index"
        >
          <router-link
            style="text-decoration: none"
            :to="{ path: '/CharsPlaylist', query: { playlistId: item.id,title:item.title } }"
          >
            <img :src="item.images[0].url" alt="" />
            <p>{{ item.description }}</p>
          </router-link>
        </div>
        <div class="w-100"></div>
        <div
          class="col-6 col-md song"
          v-for="(item, index) in songweekly.slice(5, 10)"
          :key="'song-' + index"
        >
          <router-link
            style="text-decoration: none"
            :to="{ path: '/CharsPlaylist', query: { playlistId: item.id,title:item.title } }"
          >
            <img :src="item.images[0].url" alt="" />
            <p>{{ item.description }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <iframe :src="playlistURL" allow="autoplay" ></iframe>
  </div>
</template>

<script>
export default {
  name: "chars",
  data() {
    return {
      token: "-kfmJ0iw_CHLEfmCa7T0gg==",
      charsData: [],
      hourlyData: [],
      playlistURL:""
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
        "https://api.kkbox.com/v1.1/charts/LZPhK2EyYzN15dU-PT?territory=TW",
        config
      )
      .then((response) => {
        // console.log(response.data.tracks);
        this.hourlyData = response.data.tracks.data;
      });
    this.axios
      .get("https://api.kkbox.com/v1.1/charts?territory=TW", config)
      .then((response) => {
        // console.log(response);
        this.charsData = response.data.data;
      });
  },
  methods: {
    getplayer(id){
      let url = `https://widget.kkbox.com/v1/?id=${id}&type=song&terr=TW&lang=TW&autoplay=true`;
      this.playlistURL = url;
    }
    
  },

  computed: {
    hourly() {
      return this.charsData.slice(0, 1);
    },
    songdaily() {
      return this.charsData.slice(1, 7);
    },
    newdaily() {
      return this.charsData.slice(7, 13);
    },
    songweekly() {
      return this.charsData.slice(13, 24);
    },
  },
};
</script>

<style scoped>
.chars {
  padding: 0 0 50px 0;
}
/* 綜合新歌排行榜 */
h1 {
  font-size: 60px;
  color: #000000;
  padding: 20px 0px;
  font-weight: 700;
}
.hourly .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: #272e36 solid 3px; */
}
.hourly h2 {
  padding: 10px 30px;
  /* border-bottom: #272e36 solid 3px; */
  background-color: #39362D;
  color: #f8f9fa;
  /* width: 200px; */
  text-align: center;
}
h2 {
  font-weight: 900;
}
.button {
  background-color: #39362D;
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
.hourly .song {
  display: flex;
  align-items: center;
  margin: 15px 0;
  border-radius: 10px;
  font-weight: 900;
  background: rgba(248, 249, 250, 0.3);
  color: #4B4D54;
  transition: color 0.2s;
  cursor: pointer;
}
.hourly .song:hover {
  background: rgba(75, 77, 84, 0.8);
  color: #E1AB00;
  
}
.hourly img {
  width: 100px;
  margin: 0 15px;
}
.hourly .number {
  font-size: 32px;
  margin: 0px;
  padding: 20px;
}
.hourly .songname {
  font-size: 20px;
  margin: 0px;
  padding:5px 0;
}
.hourly .artist {
  font-size: 16px;
  margin: 0px;
}
/* 日榜 */
.daily {
  padding: 30px 0 0 0;
}
.daily h2,
.weekly h2 {
  padding: 10px;
  /* border-bottom: #272e36 solid 3px; */
  background-color: #39362D;
  color: #f8f9fa;
  width: 200px;
  text-align: center;
}
.daily img,
.weekly img {
  width: 100%;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
}
.daily .song,
.weekly .song {
  margin: 10px 0;
}
.daily p,
.weekly p {
  padding: 10px;
  border-radius: 0 0 10px 10px;
  text-align: center;
  background: rgba(248, 249, 250, 0.3);
  color: #4B4D54;
  font-size: 20px;
  font-weight: 900;

}
.daily .song:hover p,
.weekly .song:hover p {
  /* background-color: aquamarine; */
  background: rgba(75, 77, 84, 0.8);
  color: #E1AB00;
  cursor: pointer;
}
/* 曲風週榜 */
.weekly {
  padding: 30px 0 0 0;
}
.weekly img {
  width: 100%;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
}
iframe{
  position: fixed;
  right: 10px;
  bottom: 10px;
  height: 102px;
}
</style>

<template>
  <v-scroll class="list-scroll" :data="songslist">
    <div class="listpage">
      <div class="page-header">
        <div class="bg">
          <img :src="$route.query.img" alt="" />
        </div>
        <div class="bg-dim">
          <div class="header-top">
            <div @click="goBack" class="back"></div>
            <div class="top-title">
              <span>歌单</span>
            </div>
          </div>
          <div class="header-detail">
            <div class="detail-img">
              <img :src="$route.query.img" alt="" />
              <div class="play-time">
                <img src="../assets/img/playtime.png" alt="" />
                <span>{{ tenThousand(listData.playCount) }}</span>
              </div>
            </div>
            <div class="detail-text">
              <div class="text-title">{{ listData.name }}</div>
              <div class="text-creator" v-if="listData.creator">
                <img :src="listData.creator.avatarUrl" alt="" />
                <span>{{ listData.creator.nickname }}</span>
              </div>
              <div class="text-description">{{ listData.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-list">
        <div class="play-all" @click="playAll">
          <img src="../assets/img/playall.png" alt="" />
          <div>
            播放全部 <span>(共{{ ids.length }}首)</span>
          </div>
        </div>
        <ul class="songs-list">
          <li
            class="songs-item"
            v-for="(item, index) in songslist"
            :key="index"
            @click="playThis(item.id)"
          >
            <div class="item-num">{{ index + 1 }}</div>
            <div class="item-text">
              <div class="name">
                <p class="text">{{ item.name }}</p>
              </div>
              <div class="detail">
                <span
                  class="singer"
                  v-for="(singer, index) in item.ar"
                  :key="index"
                >
                  {{ singer.name }}
                  <span v-show="index < item.ar.length - 1">/</span></span
                >
                <span class="album">- {{ item.al.name }}</span>
              </div>
            </div>
            <!-- <div class="mv-play" v-if="item.mv" @click="playMv(item.mv)" @click.stop="">
              <img src="../assets/img/mvplay.png" alt="">
            </div> -->
          </li>
        </ul>
      </div>
    </div>
  </v-scroll>
</template>

<script>
import scroll from "@/components/scroll";
import api from "@/api";
import { mapActions } from "vuex";
// import { mapMutations } from "vuex";
export default {
  data() {
    return {
      listData: {},
      ids: [],
      playIds: [],
      songslist: [],
    };
  },
  components: {
    "v-scroll": scroll,
  },
  created() {
    this.getList(this.$route.query.id);
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name !== "Mv") {
  //     this.$store.commit("noKeepAlive", "Listpage");
  //   }
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to);
  //   console.log(from);
  //   if(from.path == '/search'){
  //     console.log(to);
  //     setTimeout(() => {
  //       to.meta.keepAlive = true;
  //       console.log(to);
  //     }, 100)
  //   }
  //   next();
  // },
  // beforeRouteLeave(to,from,next){
  //     if(to.path == '/search'){
  //       from.meta.keepAlive = false;
  //     }
  //     next();
  // },
  methods: {
    playMv(id) {
      console.log(id);
      this.$router.push({
        name: "Mv",
        query: id,
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    getList(id) {
      api.ListDetail(id).then((res) => {
        console.log(res);
        this.listData = res.data.playlist;
        let list = res.data.playlist.trackIds;
        let ids = [];
        for (let i = 0; i < list.length; i++) {
          ids.push(list[i].id);
        }
        this.getSongList(ids);
        // console.log(ids);
        this.playIds = ids;
        this.ids = ids;
      });
    },
    getSongList(ids) {
      let id = ids.toString();
      api.MusiceDetail(id).then((res) => {
        console.log(res);
        this.songslist = res.data.songs;
      });
      console.log(this.songslist);
    },
    // getSongs(ids){
    //   api.MusiceDetail(ids).then(res => {
    //     // console.log(res);
    //     this.songslist.push(res.data.songs[0])
    //     this.playIds.push(res.data.songs[0].id)
    //   })
    // },
    tenThousand(num) {
      if (num < 10000) {
        return num;
      } else if (num >= 10000) {
        num = `${(num / 10000).toFixed(1)}万`;
        return num;
      }
    },
    playThis(id) {
      let arr = [];
      arr.push(id);
      this.selectPlaySong(arr);
    },
    playAll() {
      this.selectPlaySong(this.playIds);
    },

    ...mapActions(["selectPlaySong"]),
    // ...mapMutations({
    //   increase: "increase", // 将 `this.increase()` 映射为 `this.$store.commit('increase')`
    // }),
  },
  watch: {
    // ids(newValue) {
    //   let id = newValue.toString()
    //   api.MusiceDetail(id).then(res => {
    //     console.log(res);
    //     this.songslist = res.data.songs
    //   })
    //   console.log(this.songslist);
    // }
  },
};
</script>

<style lang="less">
@import "../assets/css/function.less";
// .listpage{
//   position: absolute;
//   top: 0;
//   height: 100%;
//   width: 100%;
//   color: #999;
//   background: rgb(255, 255, 255);
//   overflow: hidden;
.list-scroll {
  position: absolute;
  top: 0;
  // .px2rem(height, 800);
  height: 95%;
  width: 100%;
  color: #999;
  background: rgb(255, 255, 255);
  overflow: hidden;
  .listpage {
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
    .page-header {
      margin-left: -50%;
      .px2rem(height, 500);
      width: 200%;
      overflow: hidden;
      position: relative;
      border-radius: 0 0 50% 50%;
      background: rgb(255, 255, 255);
      .bg {
        width: 100%;
        height: 100%;
        filter: blur(40px);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bg-dim {
        width: 50%;
        height: 100%;
        margin-left: 25%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(44, 44, 44, 0.2);
        color: #fff;
        .px2rem(font-size, 36);
        .header-top {
          width: 100%;
          .px2rem(height, 120);
          display: flex;
          align-items: center;
          .back {
            .px2rem(height, 45);
            .px2rem(width, 45);
            background: url(../assets/img/wback.png);
            background-size: 100%;
            .px2rem(margin, 30);
          }
        }
        .header-detail {
          width: 100%;
          display: flex;
          overflow: hidden;
          .detail-img {
            .px2rem(height, 240);
            .px2rem(width, 240);
            overflow: hidden;
            border-radius: 5%;
            .px2rem(margin, 30);
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .play-time {
              position: absolute;
              top: 5%;
              right: 5%;
              .px2rem(padding-top, 5);
              .px2rem(padding-bottom, 5);
              .px2rem(padding-left, 12);
              .px2rem(padding-right,12);
              .px2rem(font-size, 22);
              background: rgba(0, 0, 0, 0.1);
              display: flex;
              align-items: center;
              .px2rem(border-radius, 20);
              span {
                display: inline-block;
              }
              img {
                .px2rem(height, 25);
                .px2rem(width, 25);
                display: inline-block;
              }
            }
          }
          .detail-text {
            .px2rem(width, 400);
            .px2rem(margin-top, 35);
            .px2rem(margin-bottom, 35);
            position: relative;
            .text-title {
              .px2rem(font-size, 32);
            }
            .text-creator {
              .px2rem(margin-top, 15);
              .px2rem(height, 50);
              display: flex;
              align-items: center;
              img {
                display: inline-block;
                .px2rem(margin-right, 20);
                height: 100%;
                border-radius: 50%;
              }
              span {
                display: inline-block;
                .px2rem(font-size, 24);
                color: rgba(255, 255, 255, 0.6);
              }
            }
            .text-description {
              max-width: 90%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              .px2rem(font-size, 24);
              color: rgba(255, 255, 255, 0.6);
              position: absolute;
              bottom: 0;
            }
          }
        }
      }
    }
    .page-list {
      .play-all {
        .px2rem(margin, 30);
        .px2rem(font-size, 34);
        font-weight: bold;
        color: #000;
        display: flex;
        align-items: center;
        img {
          .px2rem(height, 50);
          .px2rem(width, 50);
          .px2rem(margin-right, 15);
        }
        span {
          .px2rem(padding-left, 10);
          .px2rem(font-size, 24);
          font-weight: normal;
          color: rgb(129, 129, 129);
        }
      }
      .songs-list {
        .px2rem(padding-left, 25);
        .px2rem(padding-right, 25);
        box-sizing: border-box;
        width: 100%;
        .songs-item {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          .px2rem(padding-top, 30);
          .px2rem(padding-bottom, 30);
          .item-num {
            text-align: center;
            .px2rem(font-size, 30);
            width: 11%;
          }
          .item-text {
            width: 89%;
            .name {
              // max-width: 80%;
              // white-space: nowrap;
              // overflow: hidden;
              // text-overflow: ellipsis;
              font-size: 16px;
              color: black;
              overflow: hidden;
              .px2rem(line-height, 50);
              .text {
                max-width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .detail {
              .px2rem(line-height, 50);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 70%;
            }
          }
          .mv-play {
            .px2rem(height, 50);
            .px2rem(width, 50);
            position: absolute;
            top: 50%;
            right: 5%;
            .px2rem(margin-top, -25);
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
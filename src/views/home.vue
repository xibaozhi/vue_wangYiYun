<template>
  <!-- <div class="home"> -->
<Scroll :pullup="pullup" :beforeScroll="beforeScroll" :data="scroll" class="home-scroll">
  <div class="home">
    <Swipe class="home-swipe" :imgList="imgList"></Swipe>
    <Hotlist :hotSongList="hotSongList"></Hotlist>   
    <div class="hot-songs">
      <div class="hot-title">热门音乐</div>
      <div class="playAll"  @click="playAll">
        <img src="../assets/img/playall2.png" alt="">
        <span>播放</span>
      </div>
      <van-swipe :show-indicators="false" :autoplay="4000">
        <van-swipe-item class="hot-item" v-for="(item,index) in hotSongs" :key="index">
          <div class="songs-item" @touchstart="clickStart" @touchend="clickEnd(songs.id)" v-for="(songs,idx) in item" :key="idx">
            <div class="songs-img">
              <img :src="songs.picUrl" alt="">
            </div>
            <div class="songs-text" :class="idx < 2 ? 'bdb' : '' ">
              <div class="songs-name">{{songs.name}} - 
              <span class="songs-singer" v-for="(singer, index) in songs.song.artists" :key="index">  {{singer.name}}  <span v-show="index < (songs.song.artists.length - 1)">/</span></span></div>
            </div>
            <div class="mv-play" v-if="songs.song.mvid" @touchstart="clickStart" @touchend="playMv(songs.song.mvid)" @click.stop="">
              <img src="../assets/img/mvplay.png" alt="">
            </div>
          </div>
        </van-swipe-item>
      </van-swipe> 
    </div>
    <div class="home-bottom">
      本项目仅供学习使用
    </div>
  </div> 
</Scroll>
  <!-- </div> -->
</template>

<script> 
import api from '@/api'
import Swipe from "@/components/swipe.vue"
import Scroll from '@/components/scroll'
import Hotlist from '@/components/hotlist'
import { mapActions } from 'vuex'
export default {
  components: {
    Swipe,
    Scroll,
    Hotlist
  },
  data () {
    return {
      pullup: true,
      beforeScroll: true,
      goodsId: '',
      imgList: [],
      pageData: {},
      direction: '',
      hotSongList: [],
      hotSongs: [],
      hotIds: [],
      scroll: false,
      howLong:0
    };
  },
  created() {
    this.getHomePage()
    this.getHotList(9)
    this.getHotSong(40)
  },
  mounted () {
  },
  methods: {
    playMv(id){
      var duration = new Date().getTime() - this.howLong;
      if(duration<100){
        console.log(id);
        this.$router.push({
          name: 'Mv',
          query: id
        })
      }
    },
    clickStart(){
        this.howLong = new Date().getTime();
    },
    clickEnd(id){
      var duration = new Date().getTime() - this.howLong;
      if(duration<100){
        console.log(id);
        this.playThis(id)
      }
    },
    playAll() {
      this.selectPlaySong(this.hotIds)
    },
    playThis(id) {
      let arr = []
      arr.push(id)
      this.selectPlaySong(arr)
    },
    tenThousand(num){
      if (num < 10000) {
        return num
      } else if (num >= 10000) {
        num = `${(num / 10000).toFixed(1)}万`
        return num
      }
    },
    getHomePage() {
      api.HomePage().then(res => {
        this.pageData = res.data.data
        console.log(this.pageData);
        this.getImg(res.data.data.blocks[0].extInfo.banners)
        this.scroll = !this.scroll
      })
    },
    getImg(arr) {
      let img = []
      for (let i = 0; i < arr.length; i++) {
        let obj = { img: arr[i].pic }
        img.push(obj)
      }
      this.imgList = img
      console.log(this.imgList);
      this.scroll = !this.scroll
    },
    getHotList(limit) {
      api.HotList(limit).then(res => {
        this.hotSongList = res.data.result
        console.log(this.hotSongList);
        this.scroll = !this.scroll
      })
    },
    getHotSong(limit) {
      api.HotSong(limit).then(res => {
        console.log(res);
        this.hotSongs = res.data.result
        for (let i = 0; i < this.hotSongs.length; i++) {
          this.hotIds.push(this.hotSongs[i].id)
        }
        this.hotIds.splice(12)
        console.log(this.hotIds);
        let songsA = [res.data.result[0], res.data.result[1], res.data.result[2]]
        let songsB = [res.data.result[3], res.data.result[4], res.data.result[5]]
        let songsC = [res.data.result[6], res.data.result[7], res.data.result[8]]
        let songsD = [res.data.result[9], res.data.result[10], res.data.result[11]]
        this.hotSongs = [songsA, songsB, songsC, songsD]
        console.log(this.hotSongs);
        this.scroll = !this.scroll
      })
    },
    ...mapActions([
      'selectPlaySong'
    ])
  },
}

</script>
<style lang="less">
@import "../assets/css/function.less";
.home-scroll{
  .px2rem(height, 1100);
  // height: 60%;
  overflow: hidden;
  .home{
    .px2rem(padding-top, 20);
    .hot-songs{
      .px2rem(min-height, 500);
      width: 95%;
      margin: 0 auto;
      .px2rem(margin-top, 25);
      box-sizing: border-box;
      .px2rem(padding, 25);
      background: #fff;
      .px2rem(border-radius, 20);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
      .hot-title{
        .px2rem(padding-left, 10);
        .px2rem(font-size, 35);
        .px2rem(line-height, 70);
        font-weight: bold;
        color: #000;
      }
      .playAll{
        position: absolute;
        .px2rem(padding-left, 20);
        .px2rem(padding-right, 20);
        .px2rem(top, 40);
        .px2rem(right, 25);
        .px2rem(height, 40);
        display: flex;
        align-items: center;
        .px2rem(font-size, 25);
        color: #2c2c2c;
        border: 1px solid rgb(226, 226, 226);
        .px2rem(border-radius, 30);
        img{
          .px2rem(height, 22);
          .px2rem(width, 22);
          .px2rem(margin-right, 6);
        }
      }
      .hot-item{
        width: 100%;
        .px2rem(padding, 10);
        box-sizing: border-box;
        .songs-item{
          .px2rem(height, 140);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          position: relative;
          .songs-img{
            .px2rem(height, 120);
            .px2rem(width, 120);
            border-radius: 10%;
            overflow: hidden;
            position: relative;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .songs-text{
            color: #000;
            .px2rem(margin-left, 20);
            .px2rem(height, 120);
            .px2rem(line-height, 120);
            width: 75%;
            .songs-name{
              width: 80%;
              .px2rem(font-size, 30);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap; 
            }
            .songs-singer{
              .px2rem(font-size, 26);
              color: rgb(133, 133, 133);
            }
          }
          .bdb{
            border-bottom: 1px solid rgb(226, 226, 226);
          }
          .mv-play{
            .px2rem(height, 50);
            .px2rem(width, 50);
            position: absolute;
            top: 50%;
            right: 5%;
            .px2rem(margin-top, -25);
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      
    }
    .home-bottom{
      width: 100%;
      .px2rem(line-height, 100);
      // .px2rem(height, 200);
      .px2rem(font-size, 26);
      color: rgb(124, 124, 124);
      text-align: center;
    }    
  }

}



</style>
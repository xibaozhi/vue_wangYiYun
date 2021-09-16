<template>
  <div class="player">
    <audio 
    :src="playUrl" 
    autoplay
    @ended="playNext"
    @pause="onPause"
    @play="onPlay"
    ref="audio" 
    @timeupdate="onTimeupdate"
    ></audio>
      <div class="play-box">
        <div class="imgbox revolves" :class="revolves" @click="sizeChange">
          <img v-show="imgUrl" :src="imgUrl" alt="">
        </div>
        <div class="text" @click="sizeChange()">
          <span>{{playSong.name}}  </span>
          <span v-show="playSong.name">-</span>
          <span v-show="!playSong.name" class="tip">暂无歌曲播放</span>
          <span v-for="(singer, index) in playSong.ar" :key="index">
            {{singer.name}}
            <span v-show="index < (playSong.ar.length - 1)">/</span>
          </span>
        </div>
        <div class="control" :class="controlClass" @click="control()"></div>
        <div class="box-playlist" @click="listPageOn">
        </div>
        
      </div>
      <div class="play-page" :class="sizeClass" v-show="!size">
        <v-playerpage :imgUrl="imgUrl" :playSong="playSong" :size="size" :playRate="playRate" :currentTime="currentTime" :duration="duration" :isplay="isplay" @changeRate="changeRate" @sizeChange="sizeChange()" @playControl="control()" @playNext="playNext" @playLast="playLast" @listplay="listplay" @replay="replay" @listPageOn="listPageOn" ref="child"></v-playerpage>
      </div>
      <div class="list-page" v-show="listPage">
        <div class="list-bg" @click="hidePage"></div>
        <div class="page-list" >
          <p class="list-title">播放列表<span>（共{{ListDetail.length}}首）</span></p>
          <v-scroll class="play-list-scroll" :data="listPage">
            <ul>
              <li class="playlist-item" v-for="item in ListDetail" :key="item.id" >
                <div class="isplaying" v-if="item.id == nowPlay">
                  <!-- <img src="../assets/img/isplaying.png" alt=""> -->
                </div>
                <div @click="playThis(item.id)" class="song-name">{{item.name}}
                  <span class="singer" v-for="(singer, index) in item.ar" :key="index">  {{singer.name}}  <span v-show="index < (item.ar.length - 1)">/</span></span>
                  <span class="album">- {{item.al.name}}</span> 
                </div> 
                <div class="item-delete" @click="deleteThis(item.id)"></div> 
              </li>
            </ul>
          </v-scroll>  
        </div>
      </div>
  </div>
</template>

<script>
import scroll from '@/components/scroll'
import { mapGetters } from 'vuex'
import api from '@/api'
import playerpage from '@/components/playerpage.vue'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    return {
      playUrl: '',
      size: true,
      sizeClass: '',
      playList: [],
      ListDetail: [],
      nowPlay: 0,
      playSong: {},
      imgUrl: '',
      controlClass: 'play',
      revolves: 'revolves-stop',
      currentTime: 0,
      duration: 0,
      playRate: 0,
      isplay: false,
      listPage: false
    }
  },
  components: {
    'v-playerpage': playerpage,  
    'v-scroll': scroll,
  },
  mounted() {
  },
  methods: {
    onPlay(){
      this.controlClass = 'stop'
      this.revolves = ''
      this.isplay = true
    },
    onPause(){
        this.controlClass = 'play'
        this.revolves = 'revolves-stop'
        this.isplay = false
    },
    deleteThis(id) {
      let index = this.getArrayIndex(this.playList, id)
      if (this.nowPlay == id) {
        if (this.playList.length == 1) {
          this.$refs.child.toast('已经是最后一首了');
        } else {
          this.playNext()
          this.playList.splice(index, 1);
        }
      } else {
        this.playList.splice(index, 1);
      }
    },
    playThis(id) {
      this.nowPlay = id
    },
    listPageOn() {
      this.listPage = true
    },
    hidePage() {
      this.listPage = false
    },
    changeRate(value){
      console.log(value / 100 * this.$refs.audio.duration);
      this.$refs.audio.currentTime = value / 100 * this.$refs.audio.duration
    },
    onTimeupdate(res) {
      this.currentTime = res.target.currentTime
      this.duration = res.target.duration
      this.playRate = res.target.currentTime / res.target.duration * 100
    },
    sizeChange() {
      if (this.playSong.id) {
        if (this.size == true) {
          this.sizeClass = 'comup'
          this.size = false
        } else if (this.size == false) {
          this.sizeClass = 'backdown'
          setTimeout(() => {
            this.size = true
          }, 450)
        }
      } else {
        return
      }
    },
    control() {
      if (this.playUrl == '') {
        return
      }else if (this.$refs.audio.paused == false) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    getArrayIndex(arr, obj) {
      let i = arr.length;
      while (i--) {
          if (arr[i] === obj) {
              return i;
          }
      }
      return -1;      
    },
    playNext() {
      console.log(this.playList);
      
      if ((this.getArrayIndex(this.playList, this.nowPlay) + 2) <= this.playList.length) {
        console.log(this.playList);
        this.nowPlay = this.playList[this.getArrayIndex(this.playList, this.nowPlay) + 1]
      } else {
        // this.$refs.child.toast('已经是最后一首了');
        this.nowPlay = this.playList[0]
      }
      console.log(this.nowPlay);
    },
    playLast() {
      if (this.getArrayIndex(this.playList, this.nowPlay) > 0) {
        this.nowPlay = this.playList[this.getArrayIndex(this.playList, this.nowPlay) - 1]
      } else {
        // this.$refs.child.toast('已经是第一首了');
        console.log(this.playList.length - 1);
        this.nowPlay = this.playList[(this.playList.length - 1)]
      }
      // console.log(this.nowPlay);
    },
    replay() {
      this.$refs.audio.loop = true
      console.log(this.$refs.audio.loop);
    },
    listplay() {
      this.$refs.audio.loop = false
      console.log(this.$refs.audio.loop);
    },
    includes(arr1, arr2) {
      return arr2.every(val => arr1.includes(val));
    },
  },
  computed:{
    ...mapGetters(['getPlaySong'])
  },
  watch: {
    getPlaySong(newValue, oldValue) {
        if (newValue.length < 2) {
          let num = this.playList.indexOf(newValue[0])
          if (num == -1) {
            let index = (this.getArrayIndex(this.playList, this.nowPlay) + 1)
            this.playList.splice(index, 0, newValue[0])
            this.nowPlay = this.playList[index]
          } else {
            this.nowPlay = this.playList[num]
          }
        } else  if (this.includes(oldValue, newValue) == true){
          this.playList = newValue
        } else {
          this.playList = newValue
          this.nowPlay = newValue[0]
        }
    },
    nowPlay(newValue) {
      console.log(newValue);
      let params = {
        id: newValue,
        realIP: '116.25.146.177'
      }
      api.MusiceUrl(params).then(res => {
        console.log(res);
        if (res.data.data[0].url) {
          this.playUrl = res.data.data[0].url
        } else {
          this.playUrl = ''
          this.controlClass = 'play'
          this.revolves = 'revolves-stop'
          this.isplay = false
          if (this.playList.length == 1) {
            Toast('歌曲地址获取失败')
          } else {
            Toast('歌曲获取失败,即将播放下一首')
            setTimeout(() => {
              this.playNext()
            }, 1500)
          }
        }
      })
      api.MusiceDetail(newValue).then(res => {
        console.log(res);
        this.playSong = res.data.songs[0]
        this.imgUrl = res.data.songs[0].al.picUrl
      })
    },
    playList(newValue) {
      api.MusiceDetail(newValue.toString()).then(res => {
        this.ListDetail = res.data.songs
      })
    }
  }
}
</script>

<style lang="less">
  @import "../assets/css/function.less";
  .player{
    .play-box{
      .px2rem(height, 100);
      // height: 10%;
      width: 100%;
      background: #fff;
      position: absolute;
      bottom: 0;
      border-top: 1px solid rgb(225, 225, 225);
      display: flex;
      .imgbox{
        .px2rem(height, 95);
        .px2rem(width, 95);
        position: absolute;
        .px2rem(top, -10);
        .px2rem(left, 30);
        border-radius: 100%;
        background: url(../assets/img/cd.png) center;
        background-size: 120%;
        overflow: hidden;
        img{
          width: 70%;
          height: 70%;
          margin: 15%;
          border-radius: 100%;
        }
      }
      .text{
        .px2rem(line-height, 90);
        .px2rem(margin-left, 155);
        color: black;
        .px2rem(font-size, 30);
        overflow: hidden;
        text-overflow:ellipsis; 
        white-space: nowrap;
        width: 50%;
        .tip{
          color: rgb(182, 182, 182);
          .px2rem(font-size, 26);
        }
      }
      .control{
        .px2rem(height, 65);
        .px2rem(width, 65);
        .px2rem(margin-top, 15);
        .px2rem(margin-left, 30);
      }
      .box-playlist{
        .px2rem(height, 55);
        .px2rem(width, 55);
        .px2rem(margin-top, 20);
        .px2rem(margin-left, 30);
        background: url(../assets/img/playList.png) center no-repeat;
        background-size: 90%;
      }
      .play{
        background: url(../assets/img/play.png) center no-repeat;
        background-size: 90%;
      }
      .stop{
        background: url(../assets/img/stop.png) center no-repeat;
        background-size: 100%;
      }


    }
    .play-page{
      z-index: 999;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background: #fff;
      overflow: hidden;
    }
    .list-page{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1998;
        .list-bg{
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
        }
        .page-list{
          background: #fff;
          position: absolute;
          bottom: 4%;
          left: 5%;
          right: 5%;
          color: #000;
          // .px2rem(width, 550);
          width: 90%;
          box-sizing: border-box;
          .px2rem(font-size, 32);
          .px2rem(line-height, 100);
          .px2rem(border-radius, 30);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          z-index: 1999;
          p{
            .px2rem(padding-left, 50);
            border-bottom: 1px solid rgb(214, 214, 214);
            span{
              .px2rem(font-size, 24);
              color: rgb(134, 134, 134);
            }
          }
          .play-list-scroll{
            .px2rem(height, 800);
            overflow: hidden;
            ul{
            // .px2rem(padding-top, 20);
              .px2rem(padding-left, 50);
              .px2rem(padding-right, 50);
              .playlist-item{
                display: flex;
                align-items: center;
                .isplaying{
                  .px2rem(width, 30);
                  .px2rem(height, 30);
                  background: url(../assets/img/isplaying.png) no-repeat center;
                  background-size: 100%;
                  .px2rem(margin-right, 20);
                }
                .song-name{
                  max-width: 80%;
                  overflow: hidden;
                  text-overflow:ellipsis; 
                  white-space: nowrap;
                  span{
                    .px2rem(font-size, 24);
                    color: rgb(134, 134, 134);
                  }
                }
                .item-delete{
                  margin-left: auto;
                  .px2rem(width, 25);
                  .px2rem(height, 25);
                  background: url(../assets/img/x.png) no-repeat center;
                  background-size: 100%;
                }
              }         
            }
          }
        }
    }
  }
  .revolves{
    animation: revolve 8s infinite linear;
  }
  .revolves-stop{
    animation-play-state: paused;
  }
  @keyframes revolve
  {
      from {
        transform: rotate(0deg)
      }
      to {
        transform: rotate(360deg)
      }
  }
  .comup{
    animation: up 0.5s;
  }
  @keyframes up
  {
      from {
        transform: translateY(100%)
      }
      to {
        transform: translateY(0)
      }
  }
  .backdown{
    animation: down 0.5s;
  }
  @keyframes down
  {
      from {
        transform: translateY(0)
      }
      to {
        transform: translateY(100%)
      }
  }
  
  // @-webkit-keyframes myfirst /* Safari 与 Chrome */
  // {
  //     from {background: red;}
  //     to {background: yellow;}
  // }
</style>
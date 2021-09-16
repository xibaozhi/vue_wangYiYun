<template>
  <div class="playerpage">
    <img class="bg" :src="imgUrl" alt="">
    <div class="bg-dim">
      <div class="back" @click="sizeChange()"></div>
      <div class="page-header">
        <div class="header-name"  ref="nameBox">
          <span :class="moveClass" ref="nameText">{{playSong.name}}</span>
        </div>
        <p class="header-singer">
          <span v-for="(singer, index) in playSong.ar" :key="index">
            {{singer.name}}
            <span v-show="index < (playSong.ar.length - 1)">/</span>
          </span>
        </p>
      </div>
      <div class="page-img">
        <div class="top-img" :class="stylus">
          <img src="../assets/img/2.png" alt="">
        </div>
        <div class="img-edge">
          <div class="img-box revolves" :class="revolvesClass">
            <img :src="imgUrl" alt="">
          </div>
        </div>
      </div>
      <div class="page-control">
        <!-- <van-progress :percentage="playRate" :show-pivot="false" /> -->
        <div class="control-slider">
          <span>{{newPlayTime}}</span>
          <van-slider v-model="value" @change="onChange" bar-height="2px" active-color="rgba(255, 255, 255, 0.6)" inactive-color="rgba(230, 230, 230, 0.3)" button-size="8px"></van-slider>
          <span>{{playTime}}</span>
        </div>
        <div class="control-button">
          <div class="button" :class="ifReplay" @click="replay"></div>
          <div class="button last" @click="playLast"></div>
          <div class="big button" :class="playClass" @click="playControl"></div>
          <div class="button next" @click="playNext"></div>
          <div class="button list" @click="listPageOn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  props: {
    playSong: {
      type: Object,
      default: () => {}
    },
    imgUrl: {
      type: String,
      default: ''
    },
    size: {
      type: Boolean,
      default: true
    },
    playRate: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    },
    isplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      moveClass: '',
      value: 0,
      newPlayTime: '',
      playTime: '',
      playClass: 'stop',
      revolvesClass: '',
      ifReplay: 'listplay',
      stylus: ''
    };
  },
  methods: {
    listPageOn() {
      this.$emit('listPageOn')
    },
    toast(str){
      Toast(str)
    },
    replay() {
      if (this.ifReplay == 'listplay') {
        this.ifReplay = 'replay'
        this.$emit('replay')
      } else if (this.ifReplay == 'replay') {
        this.ifReplay = 'listplay'
        this.$emit('listplay')
      }
    },
    playNext() {
      this.$emit('playNext')
    },
    playLast() {
      this.$emit('playLast')
    },
    onChange(value) {
      console.log(value);
      this.$emit('changeRate', value)
    },
    timeNumber(Val){
      let second = parseInt(Val)
      if (second >= 3600) {
        let hours = Math.floor(second / 3600)
        second = second - hours * 3600
        let mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return `${hours}:${this.addZero(mimute, 2)}:${this.addZero(second, 2)}`
      } else if (second < 3600) {
        let mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return `${this.addZero(mimute, 2)}:${this.addZero(second, 2)}`
      }
    },
    addZero(num, length) {
      if((num + "").length >= length) {
        return num;
      }
      return this.addZero("0" + num, length)
    },
    sizeChange(){
      this.$emit('sizeChange')
    },
    textMove() {
      if (this.$refs.nameText.offsetWidth > this.$refs.nameBox.offsetWidth) {
        this.moveClass = 'text-move'
      }
    },
    playControl() {
      this.$emit('playControl')
    }
  },
  mounted(){
    // this.$nextTick(function() {
    //   console.log(222);
    // });
  },
  watch: {
    size(newValue) {
      if (newValue == false) {
        this.textMove()
      } else {
        this.moveClass = ''
      }
    },
    playRate(newValue) {
      this.value = newValue
    },
    duration(newValue) {
      this.playTime = this.timeNumber(newValue)
      console.log(this.timeNumber(newValue));
    },
    currentTime(newValue) {
      this.newPlayTime = this.timeNumber(newValue)
    },
    isplay(newValue) {
      if (newValue) {
        this.playClass = 'stop'
        this.revolvesClass = ''
        this.stylus = 'stylus'

      } else {
        this.playClass = 'play'
        this.revolvesClass = 'revolves-stop'
        this.stylus = ''
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/function.less";
.playerpage{
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: rgb(8, 5, 58);
  .bg{
    width: 120%;
    height: 120%;  
    filter: blur(30px);
    position: absolute;
    top: -10%;
    left: -10%; 
    right: -10%;
    bottom: -10%;
  }
  .bg-dim{
    width: 100%;
    height: 100%;   
    position: absolute;
    top: 0;
    left: 0; 
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    // filter: blur(30px);
    .back{
      background: url(../assets/img/down.png);
      .px2rem(width, 60);
      .px2rem(height, 60);
      background-size: 100%;
      position: absolute;
      .px2rem(top, 20);
      .px2rem(left, 20);
    }
    .page-header{
      .px2rem(height, 100);
      .px2rem(padding, 20);
      text-align: center;
      .header-name{
        margin: 0 auto;
        .px2rem(font-size, 36);
        .px2rem(line-height, 60);
        overflow: hidden;
        // text-overflow:ellipsis; 
        white-space: nowrap;
        max-width: 60%;
        span{
          display: inline-block;
        }
      }
      .header-singer{
        margin: 0 auto;
        .px2rem(font-size, 24);
        .px2rem(line-height, 40);
        color: rgba(255, 255, 255, 0.5);
        overflow: hidden;
        text-overflow:ellipsis; 
        white-space: nowrap;
        max-width: 60%;
      }
    }
    .page-img{
      width: 100%;
      position: relative;
      .top-img{
        position: absolute;
        .px2rem(top, -200);
        left: 49%;
        .px2rem(width, 260);
        .px2rem(height, 210);
        z-index: 2999;
        transition: 1s;
        // background: url(../assets/img/2.png) no-repeat center;
        // background-size: 100%;
        transform-origin: top left;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .img-edge{
        position: relative;
        margin: 0 auto;
        .px2rem(margin-top, 200);
        .px2rem(height, 540);
        .px2rem(width, 540);
        border-radius: 100%;
        background: rgba(255, 255, 255, 0.1);
        .img-box{
          // margin: 5% auto;
          // margin-top: 5%;
          // .px2rem(margin-top, 10);
          position: absolute;
          top: 2%;
          left: 2%;
          height: 96%;
          width: 96%;
          border-radius: 100%;
          background: url(../assets/img/cd.png) center no-repeat;
          background-size: 110%;
          overflow: hidden;
          img{
            width: 70%;
            height: 70%;
            margin: 15%;
            border-radius: 100%;
          }
        }
      }
      
    }
    .page-control{
      width: 90%;
      position: absolute;
      .px2rem(bottom, 40);
      left: 5%;
      .control-slider{
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          .px2rem(margin, 20);
        }

      }
      .control-button{
        .px2rem(margin-top, 15);
        display: flex;
        justify-content: center;
        align-items: center;
        .px2rem(height, 120);
        .button{
          flex: 1;
          .px2rem(margin, 20);
          height: 70%;
          border-radius: 50%;
        }
        .big{
          flex: 1.4;
          height: 100%;
        }
        .play {
          background: url(../assets/img/bigplay.png) center no-repeat;
          background-size: 90%;
        }
        .stop {
          background: url(../assets/img/bigstop.png) center no-repeat;
          background-size: 90%;
        }
        .replay {
          background: url(../assets/img/replay.png) center no-repeat;
          background-size: 70%;
        }
        .listplay {
          background: url(../assets/img/list-play.png) center no-repeat;
          background-size: 70%;
        }
        .replay {
          background: url(../assets/img/replay.png) center no-repeat;
          background-size: 70%;
        }
        .last {
          background: url(../assets/img/last.png) center no-repeat;
          background-size: 70%;
        }
        .next {
          background: url(../assets/img/next.png) center no-repeat;
          background-size: 70%;
        }
        .list {
          background: url(../assets/img/wplaylist.png) center no-repeat;
          background-size: 70%;
        }
      }
    }
  }
}


  .text-move{
    animation: text-move 10s infinite linear;
  }
  // .revolves-stop{
  //   animation-play-state: paused;
  // }
  @keyframes text-move
  {
      from {
        transform: translateX(60%)
      }
      to {
        transform: translateX(-100%)
      }
  }
  .revolves{
    animation: revolve 12s infinite linear;
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
  .stylus{
    // animation: stylus 1s infinite;
    transform-origin: top left;
    transform: rotate(27deg);
    
  }
  // @keyframes stylus
  // {
  //     from {
  //       transform: rotate(0deg);
  //       transform-origin: left top;
  //     }
  //     to {
  //       transform: rotate(26deg);
  //       transform-origin: left top;
  //     }
  // }
</style>
<template>
  <v-scroll class="singerpage-scroll" :data="scroll" >
    <div class="singer-page">
    
      <div class="page-header">
        <div class="bg">
          <img :src="bgImg" alt="">
        </div>
        <div class="bg-dim"></div>
        <div @click="goBack" class="back"></div>
      </div>
      <div class="singer-detail" ref="detail">
        <div class="singer-box">
          <div class="box-img">
            <img :src="$route.query.img1v1Url" alt="">
            <div class="box-tag" v-if="$route.query.identityIconUrl">
              <img :src="$route.query.identityIconUrl" alt="">
            </div>
          </div>
          <div class="singer-name">
            <p class="name-artist" v-if="singerData.artist">{{singerData.artist.name}}</p>
            <p class="singer-tag" v-if="singerData.identify">{{singerData.identify.imageDesc}}</p>
          </div>
          <div class="singer-introduce" :class="bottom">
            <p class="introduce-detail" :class="ifHidden" ref="introduce" v-if="introduce" ><span ref="text">个人简介：</span>{{introduce}}</p>
          </div>
          <div v-if="introduceButton" class="introduce-button" @click="open">
            {{introduceButton}}
          </div>
        </div>
      </div>
      <div class="hotsong-list">
        <div class="play-all">
          <img src="../assets/img/playall.png" alt="">
          <div @click="playAll">播放热门50首</div>
        </div>
        <ul class="songs-list">
          <li class="songs-item" v-for="(item, index) in hotSong" :key="index" @click="playThis(item.id)">
            <div class="item-num">{{index + 1}}</div>
            <div class="item-text">
              <div class="name">
                  <p class="text">{{item.name}}</p>
              </div>
              <div class="detail">
                <span class="singer" v-for="(singer, index) in item.ar" :key="index">  {{singer.name}}  <span v-show="index < (item.ar.length - 1)">/</span></span>
                <span class="album">- {{item.al.name}}</span>
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
import scroll from '@/components/scroll'
import api from '@/api'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      singerData: {},
      bgImg: '',
      introduceButton: '',
      ifHidden: '',
      introduce: '',
      bottom: '',
      hotSong: [],
      ids: [],
      scroll: true
    };
  },
  components: {
    'v-scroll': scroll,
  },
  created(){
    console.log(this.$route.query);
    // this.singerData = this.$route.query
    this.getSinger(this.$route.query.id)
    this.getHotSong(this.$route.query.id)
  },
  // beforeRouteUpdate(to, from, next) {
  //   if(from.path == '/search'){
  //     to.meta.keepAlive = true;
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
    playMv(id){
      console.log(id);
      this.$router.push({
        name: 'Mv',
        query: id
      })
    },
    scrollChange() {
      this.scroll = !this.scroll
    },
    goBack() {
      this.$router.go(-1);
    },
    open(){
      if (this.ifHidden == 'hidden') {
        this.introduceButton = '收起',
        this.ifHidden = ''
        this.scrollChange()
      } else if (this.ifHidden == '') {
        this.introduceButton = '展开',
        this.ifHidden = 'hidden'
        this.scrollChange()
      }
    },
    ifButton() {
      let lineNum = this.$refs.introduce.offsetHeight / this.$refs.text.offsetHeight
      
      if (lineNum > 3) {
        this.introduceButton = '展开',
        this.ifHidden = 'hidden'
        this.bottom = 'bottom'
        this.scrollChange()
      }
    },
    getSinger(id) {
      api.SingerDetail(id).then(res => {
        console.log(res);
        this.singerData = res.data.data
        this.bgImg = res.data.data.artist.cover
        this.introduce = res.data.data.artist.briefDesc
        console.log(this.singerData);
      })
    },
    getHotSong(id) {
      api.SingerHot(id).then(res => {
        this.hotSong = res.data.songs
        console.log(this.hotSong);
        for (let i = 0; i < this.hotSong.length; i++) {
          this.ids.push(this.hotSong[i].id)
        }
        this.scrollChange()
      })
    },
    playThis(id) {
      let arr = []
      arr.push(id)
      this.selectPlaySong(arr)
    },
    playAll() {
      this.selectPlaySong(this.ids)
    },
    ...mapActions([
      'selectPlaySong'
    ])
  },
  watch: {
    introduce(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.ifButton()
        });
      }
    },
  }
}
</script>

<style lang="less">
@import "../assets/css/function.less";
.singerpage-scroll{
  position: absolute;
  top: 0;
  height: 95%;
  width: 100%;
  color: #999;
  background: rgb(255, 255, 255); 
  overflow: hidden;
  .singer-page{
    .page-header{
      .px2rem(height, 500);
      width: 100%;
      overflow: hidden;
      position: relative;
      .bg{
        width: 100%;
        height: 100%;   
        // filter: blur(40px);
        position: absolute;
        top: 0;
        left: 0; 
        right: 0;
        bottom: 0;
        background: #fff;
        img{
          width: 100%;
        }
      }
      .bg-dim{
        width: 100%;
        height: 100%; 
        position: absolute;
        top: 0;
        left: 0; 
        background: rgba(44, 44, 44, 0.1);
    }  
      .back{
        position: absolute;
        .px2rem(top, 30);
        .px2rem(left, 30);
        .px2rem(height, 45);
        .px2rem(width, 45);
        background: url(../assets/img/wback.png);
        background-size: 100%;
        // .px2rem(margin, 30);
      }
     
    }
    .singer-detail{
      .px2rem(padding-left, 50);
      .px2rem(padding-right, 50);
      box-sizing: border-box;
      position: relative;
      .singer-box{
        .px2rem(border-radius, 20);
        .px2rem(padding-top, 50);
        .px2rem(padding-bottom, 50);
        background: rgba(255, 255, 255, 0.9);
        width: 80%;
        position: relative;
        // position: absolute;
        // .px2rem(top, -50);
        // left: 10%;
        // .px2rem(height, 500);
        margin: 0 auto;
        .px2rem(margin-top, -50);
        box-shadow: 0 0 10px rgba(104, 104, 104, 0.2);
        .box-img{
          position: absolute;
          .px2rem(top, -80);
          left: 0;
          right: 0;
          margin: 0 auto;
          border-radius: 50%;
          .px2rem(height, 160);
          .px2rem(width, 160);
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(104, 104, 104, 0.2);
          img{
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
          .box-tag{
            .px2rem(height, 40);
            .px2rem(width, 40);
            position: absolute;
            .px2rem(bottom, 0);
            .px2rem(right, 0);
            img{
              width: 100%;
              height: 100%;
            } 
          }
        }
        .singer-name{
          text-align: center;
          .px2rem(margin-top, 60);
          .name-artist{
            .px2rem(font-size, 40);
            font-weight: bold;
            color: #000;
          }
          .singer-tag{
            .px2rem(margin-top, 18);
            .px2rem(font-size, 26);
          }
        }
        .singer-introduce{
          .px2rem(margin-top, 18);
          .px2rem(margin-left, 50);
          .px2rem(margin-right, 50);
          .px2rem(line-height, 50);
          color: #000;
          .px2rem(font-size, 26);
          span{
            color: rgb(141, 141, 141);
          }
        }
        .bottom{
          .px2rem(margin-bottom, 35);
        }
        .hidden{
          overflow: hidden;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
        }
        .introduce-button{
          width: 90%;
          position: absolute;
          left: 5%;
          bottom: 0;
          .px2rem(margin-top, 18);
          text-align: center;
          color: #000;
          .px2rem(font-size, 26);
          border-top: 1px solid rgb(221, 221, 221);
          .px2rem(line-height, 70);
        }
      }
    }
    .hotsong-list{
      .play-all{
        .px2rem(margin, 30);
        .px2rem(font-size, 34);
        font-weight: bold;
        color: #000;
        display: flex;
        align-items: center;
        img{
          .px2rem(height, 50);
          .px2rem(width, 50);
          .px2rem(margin-right, 15);
        }
        span{
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
          .item-num{
            text-align: center;
            .px2rem(font-size, 30);
            width: 11%;
          }
          .item-text{
            width: 89%;
            // flex: 10;
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
                max-width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .detail{
              .px2rem(line-height, 50);
              overflow: hidden;
              text-overflow:ellipsis; 
              white-space: nowrap;
              max-width: 70%;      
            }
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
  }
}
</style>
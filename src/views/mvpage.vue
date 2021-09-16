<template>
  <div class="mv-page">
    <div class="goback" @click="goBack"></div>
    <!-- <div class="video-box"> -->
    <video :src="url" autoplay controls="controls"></video>
    <!-- </div> -->
  </div>
</template>

<script>
import api from '@/api'
export default {
  data(){
    return {
      url: ''
    }
  },
  created(){
    this.getMv(this.$route.query)
	},
  methods: {
    getMv(id) {
      let params = {
        id: id,
        r: 720
      }
      api.MvUrl(params).then(res => {
        console.log(res);
        this.url = res.data.data.url
      })
    },
    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>

<style lang="less">
@import "../assets/css/function.less";
.mv-page{
  position: absolute;
  top: 0;
  left: 0;
 // .px2rem(height, 800);
  height: 100%;
  width: 100%;
  color: #999;
  background: rgb(0, 0, 0); 
  z-index: 2009;
  display: flex;
  align-items: center;
  .goback{
    .px2rem(height, 45);
    .px2rem(width, 45);
    background: url(../assets/img/wback.png);
    background-size: 100%;
    position: absolute;
    .px2rem(left, 30);
    .px2rem(top, 30);
  }
  video{
    width: 100%;
    position: absolute;
  }
}
</style>
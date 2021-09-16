<!--  -->
<template>
  <div class="swiper">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in imgList" :key="index">
        <img @touchstart="clickStart" @touchend="clickEnd" :src="item.img" alt="" title="" />
      </van-swipe-item>
    </van-swipe> 
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  name: 'swiper',
  props: {
    imgList: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      howLong:0
    };
  },
  methods: {
    clickStart(){
        this.howLong = new Date().getTime();
        console.log(this.howLong);
    },
    clickEnd(){
      var duration = new Date().getTime() - this.howLong;
      console.log(duration);
      if(duration<100){
        this.checkThis()
      }
    },
    checkThis() {
      Toast('此功能暂未开放');
    }
  }
}
</script>
<style lang='less'>
@import '../assets/css/function.less';
.swiper {
  width: 95%;
  .px2rem(height, 310);
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  // .px2rem(margin-top, 17);
  .van-swipe {
    width: 100%;
    .px2rem(height, 310);
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
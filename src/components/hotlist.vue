<template>
  <div class="hot-songlist">
    <div class="hot-title">推荐歌单</div>
    <Scroll :scrollX="true" :scrollY="false" :data="hotSongList" :direction="direction" class="hotlist-scroll">
      <div class="scroll-content">
        <div class="scroll-item" @click="toListpage(item)" v-for="(item, index) in hotSongList" :key="index">
          <div class="item-img">
            <img :src="item.picUrl" alt="">
            <div class="play-time">
              <img src="../assets/img/playtime.png" alt="">
              <span>{{tenThousand(item.playCount)}}</span>
            </div>
          </div>
          <div class="item-name hidden">{{item.name}}</div>
        </div>
      </div>  
    </Scroll>
  </div>  
</template>

<script>
import Scroll from '@/components/scroll'
export default {
  components: {
    Scroll,
  },
  props: {
    hotSongList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      direction: '',
    };
  },
    methods: {
    toListpage(item) {
      this.$router.push({
        name: 'Listpage',
        query: {
          id: item.id,
          img: item.picUrl
        }
      })
    },
    tenThousand(num){
      if (num < 10000) {
        return num
      } else if (num >= 10000) {
        num = `${(num / 10000).toFixed(1)}万`
        return num
      }
    },
  }
}
</script>

<style lang="less">
@import "../assets/css/function.less";
  .hot-songlist {
    width: 95%;
    .px2rem(min-height, 390);
    margin: 0 auto;
    .px2rem(margin-top, 25);
    box-sizing: border-box;
    .px2rem(padding, 25);
    background: #fff;
    .px2rem(border-radius, 20);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .hot-title{
      .px2rem(padding-left, 10);
      .px2rem(font-size, 35);
      .px2rem(line-height, 70);
      font-weight: bold;
      color: #000;
    }
    .hotlist-scroll{ 
      width: 100%;
      overflow: hidden;
      white-space: nowrap;   
      .scroll-content{
        display: inline-block;
        .scroll-item{
          .px2rem(width, 200);
          display: inline-block;
          .px2rem(padding, 10);
          .item-img {
            .px2rem(height, 200);
            .px2rem(width, 200);
            .px2rem(border-radius, 20);
            overflow: hidden;
            position: relative;
            img{
              width: 100%;
              height: 100%;
            }
            .play-time{
                position: absolute;
                top: 5%;
                right: 5%;
                .px2rem(padding-top, 5);
                .px2rem(padding-bottom, 5);
                .px2rem(padding-left, 12);
                .px2rem(padding-right,12);
                .px2rem(font-size, 22);
                background: rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                .px2rem(border-radius, 20);
                span{
                  display: inline-block;
                }
                img{
                  .px2rem(height, 25);
                  .px2rem(width, 25);
                  display: inline-block;
                }
            }
          }
          .item-name{
            color: #000;
            .px2rem(font-size, 26);
            .px2rem(margin-top, 10);
            .px2rem(line-height, 50);
            .px2rem(width, 200);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 
          }
        }
      }
    }
  }

</style>
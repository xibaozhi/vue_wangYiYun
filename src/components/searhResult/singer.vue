<template>
  <div class="singer">
    <v-scroll class="singer-scroll" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="searchMore" :data="singer">
      <ul class="singer-list">
          <li class="singer-item" v-for="(item, index) in singer" :key="index" @click="toSingerPage(item)">
            <!-- <router-link tag="div" to="/search"> -->
            <div class="img-box">
              <img :src="item.img1v1Url" alt="">
              <div class="tag-img" v-if="item.identityIconUrl">
                <img :src="item.identityIconUrl" alt="">
              </div>
            </div>
            
            <div class="item-text">
              <div class="name">
                <p class="text">{{item.name}}<span v-show="item.alias[0]">（{{item.alias[0]}}）</span></p>
              </div>
            </div>
          </li>
      </ul>
    </v-scroll>
  </div>
</template>

<script>
import scroll from '@/components/scroll'
export default {
  props: {
    singer: {
      type: Array,
      default: () => []
    },
    singerCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pullup: true,
      beforeScroll: true,
      page: 1,
    }
  },
  components: {
    'v-scroll': scroll,
  },
  methods: {
    toSingerPage(data){
      console.log(data);
      this.$router.push({
        name: 'Singerpage',
        query: data 
      })
    },
    searchMore(){
      if (this.singerCount > (this.page * 20)) {
        console.log('more');
        this.page = this.page + 1
        this.$emit('searchMore', this.page)
      }
    },
    // tenThousand(num){
    //   if (num < 10000) {
    //     return num
    //   } else if (num >= 10000) {
    //     num = `${(num / 10000).toFixed(1)}万`
    //     return num
    //   }
    // }
  },
  watch: {
    singer(newValue) {
      console.log(newValue);
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/function.less";
.singer-scroll{
  .px2rem(padding-top, 20);
  .px2rem(height, 1100);
  box-sizing: border-box;
  overflow: hidden;
  .singer-list {
    .px2rem(padding-left, 55);
    .px2rem(padding-right, 55);

    .singer-item {
      display: flex;
      align-items: center;
      .px2rem(padding-top, 20);
      .px2rem(padding-bottom, 20);
      .img-box{
        .px2rem(height, 100);
        .px2rem(width, 100);
        .px2rem(margin-right, 20);
        
        // overflow: hidden;
        position: relative;
        img{
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
        .tag-img{
          .px2rem(height, 30);
          .px2rem(width, 30);
          position: absolute;
          .px2rem(bottom, 0);
          .px2rem(right, 0);
          img{
            width: 100%;
            height: 100%;
          } 
        }
      }
      .item-text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .name {
          .px2rem(font-size, 30);
          color: black;
          overflow: hidden;
          .px2rem(line-height, 50);
          .text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span{
              .px2rem(font-size, 26);
              color: rgb(161, 161, 161);
            }
          }
        }
        .detail{
          .px2rem(line-height, 50);
        }
      }
    }
  }
}
</style>
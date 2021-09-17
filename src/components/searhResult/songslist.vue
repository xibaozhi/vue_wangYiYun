<template>
  <div>
    <v-scroll class="songslist-scroll" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="searchMore" :data="songslist">
      <!-- :pullup="pullu p"
            :beforeScrroll="beforeScrroll"
            @scrollToEnd="searchMore"
            @beforeScrroll="listScroll"
            :data="songslist" -->
      <ul class="songs-list">
        
          <li class="songs-item" v-for="(item, index) in songslist" :key="index" @click="toListpage(item)">
            <!-- <router-link tag="div" to="/search"> -->
            <div class="img-box">
              <img :src="item.coverImgUrl" alt="">
            </div>
            <div class="item-text">
              <div class="name">
                <p class="text">{{item.name}}</p>
              </div>
              <div class="detail">
                <span>{{item.trackCount}}首,by{{item.creator.nickname}},播放了{{tenThousand(item.playCount)}}次</span>
              </div>
            </div>
            <!-- </router-link> -->
          </li>
        
      </ul>
    </v-scroll>
  </div>
</template>

<script>
import scroll from '@/components/scroll'
export default {
  props: {
    songslist: {
      type: Array,
      default: () => []
    },
    songslistCount: {
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
    toListpage(item) {
      // console.log(data);
      this.$router.push({
        name: 'Listpage',
        query: {
          id: item.id,
          img: item.coverImgUrl
        } // sendData是给详情页传的数据信息
      })
    },
    searchMore(){
      if (this.songslistCount > (this.page * 20)) {
        console.log('more');
        this.page = this.page + 1
        this.$emit('searchMore', this.page)
      }
    },
    tenThousand(num){
      if (num < 10000) {
        return num
      } else if (num >= 10000) {
        num = `${(num / 10000).toFixed(1)}万`
        return num
      }
    }
  },
  watch: {
    songslist(newValue) {
      console.log(newValue);
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/function.less";
.songslist-scroll{
  .px2rem(padding-top, 20);
  .px2rem(height, 1050);
  box-sizing: border-box;
  overflow: hidden;
  .songs-list {
    .px2rem(padding-left, 60);
    .px2rem(padding-right, 60);

    .songs-item {
      display: flex;
      align-items: center;
      .px2rem(padding-top, 15);
      .px2rem(padding-bottom, 15);
      .img-box{
        .px2rem(height, 100);
        .px2rem(width, 100);
        .px2rem(margin-right, 20);
        border-radius: 5%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
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
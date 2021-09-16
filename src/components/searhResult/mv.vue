<template>
  <div class="mv">
    <v-scroll class="mv-scroll" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="searchMore" :data="mv">
      <ul class="mv-list">
        <li class="mv-item" v-show="item.cover" v-for="(item, index) in mv" :key="index">
          <div class="mv-text">
            <span class="mv-name">{{item.name}}</span>
            <span class="mv-creater">  -  {{item.artistName}}</span>
          </div>
          <div class="mv-img" @click="toMvPage(item.id)">
            <img :src="item.cover" alt="">
            <div class="mv-playtime">
              <div class="playtime-img">
                <img src="../../assets/img/playtime.png" alt="">
              </div>
              <span>{{tenThousand(item.playCount)}}</span>
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
    mv: {
      type: Array,
      default: () => []
    },
    mvCount: {
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
    toMvPage(id){
      console.log(id);
      this.$router.push({
        name: 'Mv',
        query: id
      })
    },
    searchMore(){
      if (this.mvCount > (this.page * 20)) {
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
    mv(newValue) {
      console.log(newValue);
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/function.less";
.mv-scroll{
  .px2rem(padding-top, 20);
  .px2rem(height, 1100);
  box-sizing: border-box;
  overflow: hidden;
  .mv-list {
    .px2rem(padding-left, 55);
    .px2rem(padding-right, 55);
    .mv-item{
      .px2rem(padding-bottom, 30);
      .mv-text{
        .px2rem(margin-top, 30);
        .px2rem(margin-bottom, 30);
        .px2rem(line-height, 50);
        color: #000;
        .mv-name{
          .px2rem(font-size, 32);
        }
        .mv-creater{
          .px2rem(font-size, 26);
          color: rgb(145, 145, 145);
        }
      }
      .mv-img{
        width: 100%;
        .px2rem(min-height, 350);
        position: relative;
        img{
          .px2rem(border-radius, 20);
          width: 100%;
        }
        .mv-playtime{
          .px2rem(height, 28);
          position: absolute;
          .px2rem(bottom, 20);
          .px2rem(left, 20);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          .playtime-img{
            .px2rem(height, 28);
            .px2rem(width, 28);
            .px2rem(margin-right, 5);
            img{
              height: 100%;
              width: 100%;
            }
          }
          
        }
      }
    }
  }
}
</style>
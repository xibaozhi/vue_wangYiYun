<template>
  <div class="search">
    <div class="search-page">
      <div class="search-header">
        <router-link to="/">
          <i @click="closeResult" v-show="!query" class="iconfont icon-back"></i>
        </router-link>
        <i v-show="query" @click="closeResult" class="iconfont icon-back"></i>
        <van-search 
        class="search-box" 
        v-model="value" 
        @search="onSearch"
        placeholder="想听听什么" />
      </div>
      <div class="search-history" v-if="!query">
        <!-- <span class="item" v-for="(item, index) in searchHistory" :key="index">{{item}}</span> -->
        <v-history :searchHistory="searchHistory" @searchThis="searchThis"></v-history>
      </div>
      <div class="search-result">
        <v-suggest v-if="query" :query="query" ref="child"></v-suggest>
      </div>
      <div class="search-hot" v-show="!query">
        <h1>热搜榜</h1>
        <v-scroll>
          <div class="hot-key">
            <ul>
              <li class="item" @click="searchThis(item.searchWord)" v-for="(item, index) in hotKey" :key="index">
                <span class="item-num" :class="'top' + (index + 1)">{{index + 1}}</span>
                <span class="item-text" :class="'top' + (index + 1)">{{item.searchWord}}</span>
                <span class="item-icon">
                  <img :src="item.iconUrl" alt="">
                </span>
              </li>
            </ul>
          </div>
        </v-scroll>
      </div>
    </div>
  </div>
</template>

<script>
// import { debounce } from '@/common/util'
import { searchMixin } from '@/common/js/mixin.js'
import suggest from '@/components/suggest.vue'
import history from '@/components/searchHistory.vue'
import scroll from '@/components/scroll.vue'
import api from '@/api'
export default {
  mixins: [ searchMixin ],
  components: {
    'v-suggest': suggest,
    'v-history': history,
    'v-scroll': scroll
  },
  watch: {
    value(newValue) {
      if (!newValue) {
        this.query = newValue
      }
    },
    searchHistory(newValue) {
      if (newValue.length > 16) {
        newValue.pop()
      }
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    closeResult() {
      // this.$refs.child.pageBack();
      this.query = ''
      this.value = ''
      
    },
    _getHotKey() {
      api.HotSearchKey().then(res => {
        this.hotKey = res.data.data
        console.log(this.hotKey);
      })
    },
    searchThis(key){
      this.query = key
      this.value = key
      this.searchHistory.unshift(key)
    }
  },
  // created() {
  //   this.$watch(
  //     "value",
  //     debounce(() => {
  //       this.search(this.value)
  //       // this.query = this.value
  //       // console.log(this.query);
  //     }, 300)
  //   );
  // },  
}
</script>

<style lang="less">
@import '../assets/css/function.less';
.search{
  .search-page{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    color: #999;
    background: rgb(255, 255, 255);
    .search-header{
      .px2rem(height, 120);
      .px2rem(line-height, 80);
      .px2rem(padding, 20);
      box-sizing: border-box;
      display: flex;
      .iconfont{
        font-size: 24px;
        // margin-right: 12px;
        color: #555;
      }
      .search-box{
        width: 100%;
        // margin-right: 12px;
        font-size: 14px;
      }
    }
    .search-hot{
      .px2rem(margin, 40);
      h1{
        .px2rem(font-size, 28); 
        color: #000;
        .px2rem(margin-bottom, 40);
      }
      .hot-key{
        .px2rem(min-height, 830);
        box-shadow: 0px 0px 10px #c4c4c4;
        border-radius: 10px;
        .px2rem(padding-top, 20);
        .px2rem(padding-bottom, 20);
        ul{
          display: flex;
          flex-wrap: wrap;
          .item{
            display: flex;
            width: 50%;
            .px2rem(padding, 20);
            .px2rem(line-height, 45);
            .px2rem(height, 85);
            box-sizing: border-box;
            span{
              .px2rem(margin-right, 20);
              .px2rem(font-size, 26);
            }
            .item-num{
              color: rgb(173, 173, 173);
            }
            .item-text{
              color: #000;
              max-width: 60%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .item-icon{
              height: 60%;
              img{
                height: 100%;
              }
            }
            .top1, .top2, .top3{
              .px2rem(font-size, 28);
              color: #000;
              font-weight: 550;
            }
          }
        }
        
      }
    }
  }
}
</style>
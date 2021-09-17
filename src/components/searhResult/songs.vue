<template>
  <v-scroll class="songs-scroll" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="searchMore" :data="songs">
    <ul class="songs-list">
        <li class="songs-item" v-for="(item, index) in songs" :key="index" @click="playThis(item)">
            <div class="name">
                <p class="text">{{item.name}}</p>
            </div>
            <div class="detail">
              <span class="singer" v-for="(singer, index) in item.artists" :key="index">  {{singer.name}}  <span v-show="index < (item.artists.length - 1)">/</span></span>
              <span class="album">- {{item.album.name}}</span>
            </div>
            <div class="mv-play" v-if="item.mvid" @click="playMv(item.mvid)" @click.stop="">
              <img src="../../assets/img/mvplay.png" alt="">
            </div>
        </li>
    </ul>      
  </v-scroll>  
</template>

<script>
import scroll from '@/components/scroll'
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    songsCount: {
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
    playMv(id){
      console.log(id);
      this.$router.push({
        name: 'Mv',
        query: id
      })
    },
    searchMore(){
      if (this.songsCount > (this.page * 20)) {
        console.log('more');
        this.page = this.page + 1
        this.$emit('searchMore', this.page)
      }
    },
    playThis(id) {
      this.$emit('playThis', id)
    }
  },
  watch: {
    songs(newValue) {
      console.log(newValue);
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/function.less";
.songs-scroll{
  .px2rem(padding-top, 20);
  .px2rem(height, 1050);
  box-sizing: border-box;
  overflow: hidden;
  .songs-list {
    .px2rem(padding-left, 60);
    .px2rem(padding-right, 60);

    .songs-item {
      // display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(225, 225, 225);
      .px2rem(padding-top, 30);
      .px2rem(padding-bottom, 30);
      position: relative;
    }

    

    .name {
      // flex: 1;
      .px2rem(font-size, 30);
      color: black;
      overflow: hidden;
      .px2rem(line-height, 50);
      .text {
        max-width: 85%;
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
</style>
<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
    <!-- 需要缓存的视图组件 -->
    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <keep-alive :include="cached">
      <router-view />
    </keep-alive> -->
    <v-player v-show="true"></v-player>
  </div>
</template>

<script>
import header from "@/components/header";
import player from "@/components/player";
export default {
  components: {
    "v-header": header,
    "v-player": player,
  },
  data() {
    return {
    };
  },
};
</script>


<style lang="less">
@font-face {
  font-family: "icon";
  /* project id 277165 */
  src: url("//at.alicdn.com/t/font_kmywdojzhchj8aor.eot");
  src: url("//at.alicdn.com/t/font_kmywdojzhchj8aor.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_kmywdojzhchj8aor.woff") format("woff"),
    url("//at.alicdn.com/t/font_kmywdojzhchj8aor.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_kmywdojzhchj8aor.svg#iconfont") format("svg");
}

.icon {
  font-family: "icon" !important;
  font-size: 18px;
  font-style: normal;
  color: #ffffff;
}

html,
body {
  line-height: 1;
  font-family: PingFang SC, STHeitiSC-Light, Helvetica-Light, arial, sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: rgba(245, 245, 245, 1);
  color: #fff;
  width: 100%;
  height: 100%;
}
// #app{
//   height: 100%;
//   width: 100%;
// }
</style>

<template>
  <div class="header">
      <div class="header-icon">
          <!-- <i class="icon">&#xe692;</i> -->
      </div>
      <div class="header-search">
          <router-link tag="div" to="/search">
            <div class="goSearch">
              <i class="icon icon-search">&#xe638;</i>
              此刻的你想听听什么
               <!-- tag="div" class="tab-item" -->
            </div>
          </router-link>
      </div>
      <div class="header-icon">
          <!-- <i class="icon">&#xe63c;</i> -->
      </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="less">
@import '../assets/css/function.less';
.header{
    .px2rem(height, 120);
    .px2rem(line-height, 120);
    // width: 100%;
    padding: 0 6px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(185, 18, 6, 0.9);
    font-weight: bold;
    box-sizing: border-box;
    .header-search{
       .goSearch{
           .px2rem(height, 60);
           .px2rem(width, 500);
           .px2rem(line-height, 60);
           background: rgba(255, 255, 255, 0.2);
        //    .px2rem(margin-top, 30);
           color: rgba(255, 255, 255, 0.6);
           font-weight: normal;
           .px2rem(border-radius, 35);
           i{
              color: rgba(255, 255, 255, 0.6); 
           }
       } 
    }
}
</style>
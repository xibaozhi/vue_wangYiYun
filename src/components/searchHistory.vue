<template>
    <div class="history">
        <p class="text">历史</p>
        <!-- <div class="scroll-wrapper" ref="scroll"> -->
        <Scroll :scrollX="true" :scrollY="false" :data="searchHistory" :direction="direction" class="scroll-wrapper">
            <div class="scroll-content">
                <div v-show="searchHistory.length == 0" class="tip">暂无搜索历史</div>
                <div class="scroll-item" @click="searchThis(item)" v-for="(item, index) in searchHistory" :key="index">{{item}}</div>
            </div>
        </Scroll>        
    </div>
</template>

<script>
import Scroll from '@/components/scroll'
export default {
    props: {
        searchHistory: {
            type: Array,
            default: () => []
        },
    },
    components: {
        Scroll,
    },
    data () {
      return { 
          tip: true,
          direction: '',      
      }
    },
    methods: {
        searchThis(key) {
            this.$emit('searchThis', key)
        }
    },
    watch: {
        // searchHistory() {
        //     if (this.searchHistory !== ) {

        //     }
        // }
    },

    
}
</script>

<style lang="less">
    @import "../assets/css/function.less";
    .history{
        .px2rem(padding-left, 40);
        .px2rem(padding-right, 40);
        // padding-left: 5%;
        // padding-right: 5%;
        box-sizing: border-box;
        display: flex;
        .px2rem(line-height, 60);
        .text{
            .px2rem(font-size, 28); 
            color: #000;
            width: 12%;
        } 
        .scroll-wrapper{
            width: 88%;
            overflow: hidden;
            white-space: nowrap;
            .scroll-content{
                display: inline-block ;
                .scroll-item{
                    display: inline-block;
                    .px2rem(height, 60);
                    .px2rem(padding-left, 25);
                    .px2rem(padding-right, 25);
                    .px2rem(margin-right, 10);
                    .px2rem(border-radius, 30);
                    color: #000;
                    background: rgba(228, 228, 228, 0.5);
                    .px2rem(margin-bottom, 10);
                }
            }

        }
    }
// @import "../assets/css/function.less";
// .history{
//     .px2rem(padding-left, 40);
//     .px2rem(padding-right, 40);
//     display: flex;
//     .px2rem(line-height, 60);
//     .text{
//         .px2rem(font-size, 28); 
//         color: #000;
//         .px2rem(margin-right, 30); 
//     } 
//     .history-scroll{
//         width: 200px;
//         overflow: hidden;
//         white-space: nowrap;
//         // .px2rem(height, 200);
//         .history-list{
//             align-items: center;
//             display: inline-block;    
//             .history-item{
//                 display: inline-block;
//                 .px2rem(height, 60);
//                 .px2rem(padding-left, 25);
//                 .px2rem(padding-right, 25);
//                 .px2rem(margin-right, 10);
//                 .px2rem(border-radius, 30);
//                 color: #000;
//                 background: rgba(228, 228, 228, 0.5);
//             }  
//         }        
//     }

// }

</style>
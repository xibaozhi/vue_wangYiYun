<template>
    <van-tabs v-model="active" @click="onClick" animated>
            <van-tab title="单曲">
                <v-songs :songs="songs" :songsCount="songsCount" @searchMore="searchMore" @playThis="playThis"></v-songs>
            </van-tab>
            <van-tab title="歌单">
                <v-songslist :songslist="songslist" :songslistCount="songslistCount" @searchMore="searchMore"></v-songslist>
            </van-tab>
            <van-tab title="歌手">
                <v-singer :singer="singer" :singerCount="singerCount" @searchMore="searchMore"></v-singer>
            </van-tab>
            <van-tab title="mv">
                <v-mv :mv="mv" :mvCount="mvCount" @searchMore="searchMore"></v-mv>
            </van-tab>
    </van-tabs>
</template>

<script>
// import scroll from '@/components/scroll'
import songs from '@/components/searhResult/songs.vue'
import songslist from '@/components/searhResult/songslist.vue'
import singer from '@/components/searhResult/singer.vue'
import mv from '@/components/searhResult/mv.vue'
import api from '@/api'
import { mapActions } from 'vuex'
export default {
    props: {
        query: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            pullup: true,
            beforeScrroll: true,
            page: 1,
            result: [],
            hasMore: true,
            active: 0,
            type: 1,
            songs: [],
            songslist: [],
            singer: [],
            mv: [],
            songsCount: 0,
            songslistCount: 0,
            singerCount: 0,
            mvCount:0,
            playUrl: '',

            // tabClass: ['on', '', '', '']
        }
    },
    components: {
        // 'v-scroll': scroll,
        'v-songs': songs,
        'v-songslist': songslist,
        'v-singer': singer,
        'v-mv': mv,
    },
    created() {
        this.search(this.query)
    },
    methods: {
        // pageBack(){
        //     // this.active = 0
        //     console.log(this.active);
        // },
        searchMore(page) {
            console.log(page);
            this.fetchResult(page)
        },
        playThis(item) {
            let arr = []
            arr.push(item.id)
            this.selectPlaySong(arr)
            // api.MusiceUrl(item.then(res => {
            //     // this.playUrl = res.data.data[0].url
            //     console.log(res);
            // })
            // api.MusiceDetail(item.id).then(res => {
            //     // this.playUrl = res.data.data[0].url
            //     console.log(res);
            // })
        },
        listScroll() {},
        onClick(name, title) {
            console.log(this.active);
            console.log(title);
            if (title == '单曲') {
                this.type = 1
                if(this.query && this.songs == false) {
                    this.search(this.query)
                }
            }
            if (title == '歌单') {
                this.type = 1000
                // console.log(Object.keys(this.songslist).length==0);
                if(this.query && this.songslist == false) {
                    this.search(this.query)
                }
            }
            if (title == '歌手') {
                this.type = 100
                if(this.query && this.singer == false) {
                    this.search(this.query)
                }
            }
            if (title == 'mv') {
                this.type = 1004
                if(this.query && this.mv == false) {
                    this.search(this.query)
                }
            }
            console.log(this.type);
        },

        // tabClick(e) {
        //     this.tabClass = ['', '', '', '']
        //     this.tabClass[e] = 'on'
        //     this.active = e
        //     if (e == 0) {
        //         this.type = 1
        //         if(this.query && this.songs == false) {
        //             this.search(this.query)
        //         }
        //     }
        //     if (e == 1) {
        //         this.type = 1000
        //         // console.log(Object.keys(this.songslist).length==0);
        //         if(this.query && this.songslist == false) {
        //             this.search(this.query)
        //         }
        //     }
        //     if (e == 2) {
        //         this.type = 100
        //         if(this.query && this.singer == false) {
        //             this.search(this.query)
        //         }
        //     }
        //     if (e == 3) {
        //         this.type = 1004
        //         if(this.query && this.mv == false) {
        //             this.search(this.query)
        //         }
        //     }
        //     console.log(this.type);
        // },

        search() {
            this.page = 1
            this.hasMore = true
            this.result = []
            this.fetchResult(this.page)
        },
        fetchResult(page) {
            const params = {
                limit: 20,
                type: this.type,
                offset: page - 1,
                keywords: this.query
            }
            api.MusiceSearch(params).then(res => {
                console.log(res);
                if (this.type == 1) {
                    this.songs = [...this.songs, ...res.data.result.songs]
                    this.songsCount = res.data.result.songCount
                }
                if (this.type == 1000) {
                    this.songslist = [...this.songslist, ...res.data.result.playlists]
                    this.songslistCount = res.data.result.playlistCount
                }
                if (this.type == 100) {
                    this.singer = [...this.singer, ...res.data.result.artists]
                    this.singerCount = res.data.result.artistCount
                }
                if (this.type == 1004) {
                    this.mv = [...this.mv, ...res.data.result.mvs]
                    this.mvCount = res.data.result.mvCount
                }
            })
        },
        ...mapActions([
            'selectPlaySong'
        ])
    },
    watch: {
        // query(newValue) {
        //     console.log(666);
        //     if (!newValue) {
        //         return
        //     }
        //     if (newValue) {
        //         this.songs = [],
        //         this.songslist = [],
        //         this.singer = [],
        //         this.mv = [] 
        //     }
        //     this.search(newValue)
        // }
    }
}
</script>

<style lang="less">
// @import "../assets/css/function.less";

</style>
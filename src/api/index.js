import axios from "axios"
import Vue from "vue"
const vue = new Vue()

// axios配置
axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'https://netease-cloud-music-api-alpha-eight.vercel.app/'

// 返回拦截
axios.interceptors.response.use(
    (res) => {
        if (res.data.code !== 200) {
            vue.$toast('网络异常')
            return Promise.reject(res)
        }
        return res
    },
    (error) => {
        vue.$toast('网络异常')
        return Promise.reject(error)
    }
)

export function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export default {
    // 搜素
    MusiceSearch(params) {
        return fetchGet('/search', params)
    },
    // 热搜
    HotSearchKey() {
        return fetchGet('/search/hot/detail')
    },
    // 获取音乐
    MusiceUrl(params) {
        return fetchGet('/song/url', params)
    },
    // 获取音乐
    MusiceDetail(ids) {
        return fetchGet('/song/detail', { ids })
    },
    // 歌单数据
    ListDetail(id) {
        return fetchGet('/playlist/detail', { id })
    },
    // 歌手数据
    SingerDetail(id) {
        return fetchGet('/artist/detail', { id })
    },
    // 歌手热门50首
    SingerHot(id) {
        return fetchGet('/artist/top/song', { id })
    },
    // mv地址
    MvUrl(params) {
        return fetchGet('/mv/url', params)
    },
    // 首页
    HomePage() {
        return fetchGet('/homepage/block/page')
    },
    // 热门歌单
    HotList(limit) {
        return fetchGet('/personalized', { limit })
    },
    // 热门歌曲
    HotSong(limit) {
        return fetchGet('/personalized/newsong', { limit })
    }
}
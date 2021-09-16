import * as type from '../types'
const state = {
    playSong: []
}

const mutations = {
    [type.SET_PLAY_SONG] (state, song) {
        state.playSong = song
        
    }
}

const actions = {
    selectPlaySong({ commit }, song) {
        commit(type.SET_PLAY_SONG, song)
    }
}

const getters = {
    getPlaySong: state => state.playSong
}

export default {
    state,
    mutations,
    actions,
    getters
}
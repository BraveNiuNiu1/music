import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playing: false, // 歌曲是否正在播放
    fullscreen: false, // 是否打开全屏播放器
    playlist: false, // 是否打开播放列表弹窗
    songList: [], // 播放歌曲列表
    currentId: '', // 当前播放歌曲的id
    // 页面刷新时，new Vuex.Store会重新创建实例，数据会丢失
    saveList: JSON.parse(localStorage.getItem('saveList') || '[]'), // 收藏歌曲列表
  },
  getters: {
    // currentSong(state) {
    //   const { songList, currentId } = state;
    //   return songList.find(i => i.id === currentId);
    // },
    currentSong: ({ songList, currentId }) => songList.find(i => i.id === currentId)
  },
  mutations: {
    // 切换播放状态
    togglePlaying(state) {
      state.playing = !state.playing;
    },
    // 切换全屏播放器
    toggleFullscreen(state) {
      state.fullscreen = !state.fullscreen;
    },
    // 切换播放列表弹窗
    togglePlaylist(state) {
      state.playlist = !state.playlist;
    },
    // 向播放列表中添加一首歌曲
    addSong(state, song) {
      const index = state.songList.findIndex(i => i.id === song.id);
      if (index === -1) {
        state.songList.unshift(song);
      }
    },
    // 从播放列表中删除一首歌曲
    delSong(state, song) {
      const index = state.songList.findIndex(i => i.id === song.id);
      if (index > -1) {
        state.songList.splice(index, 1);
      }
    },
    // 清空播放列表
    clearSong(state) {
      state.songList = [];
    },
    // 播放一首歌曲
    play(state, song) {
      state.currentId = song.id;
    },

    // 切换一首歌曲的收藏
    toggleSave(state, song) {
      // 如果saveList中没有就添加，如果有就删除
      const index = state.saveList.findIndex(i => i.id === song.id);
      if (index > -1) {
        state.saveList.splice(index, 1);
      } else {
        state.saveList.unshift(song);
      }
      // 规定最多收藏10首歌
      if (state.saveList.length === 11) state.saveList.pop();

      localStorage.setItem('saveList', JSON.stringify(state.saveList));
    }
  },
  actions: {
  }
});

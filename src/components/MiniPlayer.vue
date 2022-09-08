<template>
<div
  class="mini-player"
  @click="$store.commit('toggleFullscreen')"
  v-if="$store.state.songList.length > 0"
>
  <div
    class="avatar"
    :class="{ 'playing': $store.state.playing }"
    :style="{ 'background-image': `url(${song.cover})` }"
  ></div>
  <div class="info">{{ song.song }}</div>
  <div class="btns">
    <div class="progress">
      <circle-progress :percent="percent" />
    </div>
    <div
      class="btn"
      :class="[ $store.state.playing ? 'pause' : 'play' ]"
      @click.stop="togglePlay"
    ></div>
    <div class="btn playlist" @click.stop="$store.commit('togglePlaylist')"></div>
  </div>
  <fullscreen-player
    ref="fullscreenPlayer"
    :percent="percent"
    @change="onChange"
    @toggle-play="togglePlay"
  />
  <playlist-modal />
  <audio
    ref="audio"
    :src="song.url"
    @timeupdate="onTimeupdate"
    @ended="$refs.fullscreenPlayer.next()"
  />
</div>
</template>

<script>
import FullscreenPlayer from './FullscreenPlayer.vue';
import PlaylistModal from './PlaylistModal.vue';
import CircleProgress from './CircleProgress.vue';
export default {
  components: {
    FullscreenPlayer,
    PlaylistModal,
    CircleProgress
  },
  data() {
    return {
      percent: 0 // 歌曲播放进度0-100
    };
  },
  computed: {
    // 当前播放的歌曲
    song() {
      // const { songList, currentId } = this.$store.state;
      // return songList.find(i => i.id === currentId);
      return this.$store.getters.currentSong;
    }
  },
  watch: {
    // 通过监听currentId的变化，判断是否要添加并播放 / 切换歌曲
    // $store.state公共数据是响应式的，可以被watch
    '$store.state.currentId'(id) {
      if (!id) return;
      // 数据发生变化，视图更新是异步/是在事件循环的最后
      this.$nextTick(() => {
        // 如果是切歌，本身就是正在播放，如果直接调用改状态会导致状态错误
        if (!this.$store.state.playing) this.$store.commit('togglePlaying');
        if (!this.$store.state.fullscreen) this.$store.commit('toggleFullscreen');
        const { audio } = this.$refs;
        audio.play();
      });
    }
  },
  methods: {
    togglePlay() {
      const { audio } = this.$refs;
      // 判断是否暂停，如果停止了，就play播放
      // audio.paused ? audio.play() : audio.pause();
      this.$store.state.playing ? audio.pause() : audio.play();
      this.$store.commit('togglePlaying');
    },

    onTimeupdate(event) {
      this.percent = Math.ceil(event.target.currentTime / this.song.duration * 100);
    },

    onChange(event) {
      const { audio } = this.$refs;
      audio.currentTime = this.song.duration * (event / 100);
      // 判断是否暂停，如果停止了，就play播放
      if (!this.$store.state.playing) {
        audio.play();
        this.$store.commit('togglePlaying');
      }
    }
  }
}
</script>

<style lang="sass">
.mini-player
  display: flex
  align-items: center
  position: fixed
  right: 0
  bottom: 0
  left: 0
  height: 1.2rem
  padding: 0 .2rem
  // 渐进增强
  background-color: #061842
  background: linear-gradient(15deg, #061842, #2c50a1)
  .avatar
    width: .8rem
    height: .8rem
    flex: 0 0 .8rem
    border-radius: 50%
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    animation: avatar-rotate 5s linear infinite
    animation-play-state: paused
    &.playing
      animation-play-state: running
  .info
    flex: 1
    padding: 0 .15rem
  .btns
    position: relative
    display: flex
    width: 1.2rem
    flex: 0 0 1.2rem
    // 在sass样式路径中使用@替代src时，需要在前面加~
    .playlist
      width: .6rem
      height: 1.2rem
      background: url(~@/assets/img/icon-playlist.png) no-repeat center
      background-size: .4rem
    .play
      width: .6rem
      height: 1.2rem
      background: url(~@/assets/img/icon-play.png) no-repeat center
      background-size: .4rem
    .pause
      width: .6rem
      height: 1.2rem
      background: url(~@/assets/img/icon-pause.png) no-repeat center
      background-size: .4rem
    .progress
      position: absolute
      top: .21rem
      left: -.11rem
      width: .8rem
      height: .8rem
      // 让它不能被鼠标点击
      pointer-events: none
      svg
        width: 100%
        height: 100%
</style>

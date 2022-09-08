<template>
<div
  class="fullscreen-player"
  :class="{ 'show': $store.state.fullscreen }"
  @click.stop
>
  <button
    class="close"
    @click="$store.commit('toggleFullscreen')"
  ></button>
  <h2>{{ song.song }}</h2>
  <h3>{{ song.singer }}</h3>
  <div
    class="cover"
    :class="{ 'playing': $store.state.playing }"
    :style="{ 'background-image': `url(${song.cover})` }"
  ></div>
  <div class="control">
    <slider :value="percent" @change="onChange" />
    <div class="time">
      <span>{{ time.current }}</span>
      <span>{{ time.total }}</span>
    </div>
    <div class="btn-list">
      <div class="prev" @click="prev"></div>
      <div
        :class="[ $store.state.playing ? 'pause' : 'play' ]"
        @click="$emit('toggle-play')"
      ></div>
      <div class="next" @click="next"></div>
      <div
        :class="['heart', isSaved ? 'active' : '']"
        @click="$store.commit('toggleSave', song)"
      ></div>
    </div>
  </div>
</div>
</template>

<script>
import Slider from 'vant/lib/slider';
import 'vant/lib/slider/style';

export default {
  components: { Slider },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 当前播放的歌曲
    song() {
      return this.$store.getters.currentSong;
    },
    time() {
      const { percent } = this;
      const { duration } = this.song;
      // 当前歌曲播放到了current秒
      const current = Math.ceil(duration * (percent / 100));
      // 把秒格式转成几分:几秒
      const fn = s => {
        // 65s = 1:05，126s = 2:06
        return `${Math.floor(s / 60)}:${s % 60}`;
      };
      return {
        current: fn(current),
        total: fn(duration)
      };
    },
    // 当前歌曲是否已收藏
    isSaved() {
      return this.$store.state.saveList.some(i => i.id === this.song.id);
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event);
    },
    prev() {
      const { songList, currentId } = this.$store.state;
      // 当前播放歌曲在播放列表中的下标
      let index = songList.findIndex(i => i.id === currentId);
      // 如果当前播放的是第一首歌，前面没有了，就播放最后一首
      index = index === 0 ? songList.length - 1 : index - 1;
      this.$store.commit('play', songList[index]);
    },
    next() {
      const { songList, currentId } = this.$store.state;
      // 当前播放歌曲在播放列表中的下标
      let index = songList.findIndex(i => i.id === currentId);
      // 如果当前播放的是最后一首歌，后面没有了，就播放第一首
      index = index === songList.length - 1 ? 0 : index + 1;
      this.$store.commit('play', songList[index]);
    }
  }
};
</script>


<style lang="sass">
.fullscreen-player
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  padding: .3rem 0
  background: #000 url(@/assets/img/bg.png) center top no-repeat
  background-size: cover
  text-align: center
  transform: translateY(100%)
  transition: .6s
  &.show
    transform: translateY(0)
  .close
    position: absolute
    top: .2rem
    left: .2rem
    background: transparent
    border: none
    &:before
      content: ""
      display: block
      width: .4rem
      height: .4rem
      border-right: 2px solid #fff
      border-bottom: 2px solid #fff
      transform: rotate(45deg)
  .cover
    display: inline-block
    width: 60vw
    height: 60vw
    margin: 1rem 0
    border-radius: 50%
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    animation: avatar-rotate 5s linear infinite
    animation-play-state: paused
    box-shadow: 0 0 0 6px hsla(0,0%,100%,.05), 0 0 0 16px hsla(0,0%,100%,.05), 0 0 0 26px hsla(0,0%,100%,.05)
    &.playing
      animation-play-state: running

  .control
    margin: 0 1rem
    .time
      display: flex
      justify-content: space-between
      padding: .2rem 0 .4rem
    .btn-list
      display: flex
      justify-content: space-between
      div
        width: .8rem
        height: .8rem
        background-repeat: no-repeat
        background-position: center
        background-size: .6rem
        &:nth-child(2)
          background-color: #333
          border-radius: 50%
        &.prev
          background-image: url(../assets/img/icon-prev.png)
        &.play
          background-image: url(../assets/img/icon-play.png)
        &.pause
          background-image: url(../assets/img/icon-pause.png)
        &.next
          background-image: url(../assets/img/icon-next.png)
        &.heart
          background-image: url(../assets/img/icon-favorite.png)
          &.active
            background-image: url(../assets/img/icon-favorite-active.png)
</style>

<template>
<transition name="playlist">
  <!-- stop是为了让该组件内部的click不冒泡出去，self是为了让该点击事件只能通过标签本身触发 -->
  <div
    class="playlist-modal"
    v-if="$store.state.playlist"
    @click.stop.self="close"
  >
    <div class="playlist-content">
      <div class="title">
        <div class="clear" @click="clearSong">清空</div>
      </div>
      <ul>
        <li
          v-for="d in $store.state.songList"
          :key="d.id"
        >
          <div class="playing"></div>
          <div class="info">{{ d.song }}</div>
          <div class="delete"
            @click="delSong(d)"
          >X</div>
        </li>
      </ul>
      <button @click="close">关闭</button>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  methods: {
    // 关闭本弹窗
    close() {
      this.$store.commit('togglePlaylist');
    },
    clearSong() {
      this.$store.commit('clearSong');
      this.close();
    },
    delSong(song) {
      this.$store.commit('delSong', song);
      if (!this.$store.state.songList.length) {
        this.close();
      }
    }
  }
};
</script>

<style lang="sass">
.playlist-modal
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background: rgba(0,0,0,.6)
  .playlist-content
    position: absolute
    top: 20%
    right: 0
    bottom: 0
    left: 0
    background: #000

.playlist-enter, .playlist-leave-to
  opacity: 0
  .playlist-content
    transform: translateY(100%)
.playlist-enter-active
  transition: .6s
  .playlist-content
    transition: .3s .3s
.playlist-leave-active
  transition: .6s
  .playlist-content
    transition: .3s


</style>

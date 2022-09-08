<template>
<div class="home-wrapper">
  <swiper-box />
  <h2>热门单曲推荐</h2>
  <ul>
    <li
      v-for="d in list"
      :key="d.id"
      @click="add(d)"
      class="hit-single-item"
    >
      <img :src="d.cover" />
      <div class="info">
        <div class="song">{{ d.song }}</div>
        <div class="album">{{ d.singer }} - {{ d.album }}</div>
      </div>
    </li>
  </ul>
  <!-- <audio :src="mp3" autoplay /> -->
</div>
</template>

<script>
import request from '@/utils/request.js';
import SwiperBox from '@/components/SwiperBox.vue';
export default {
  components: { SwiperBox },
  data() {
    return {
      list: [],
      mp3: '' // 当前播放歌曲的URL地址
    };
  },
  created() {
    request('/hit-single-list').then(({ data }) => {
      this.list = data;
    });
  },
  methods: {
    add(song) {
      this.$store.commit('addSong', song);
      this.$store.commit('play', song);
    }
  }
};
</script>

<style lang="sass">
.home-wrapper
  padding: .4rem
  h2
    line-height: .6rem
    font-size: .32rem
    opacity: .8
  .hit-single-item
    display: flex
    align-items: center
    height: 1.3rem
    img
      flex: 0 0 1rem
      height: 1rem
      border-radius: .06rem
      border: 1px solid #5a485f
    .info
      flex-grow: 1
      padding-left: .3rem
      overflow: hidden
      .song
        font-size: .28rem
      .album
        font-size: .24rem
        opacity: .4
</style>

<template>
<div class="swiper-box">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="d in list"
        :key="d.image"
      >
        <a :href="d.link" target="_black">
          <img :src="d.image" />
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</div>
</template>

<script>
import request from '@/utils/request.js';
import Swiper, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  data() {
    return {
      list: [],
      swiper: null
    }
  },
  mounted() {
    this.swiper = new Swiper('.swiper', {
      modules: [ Pagination ],
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay: {
        delay: 2000
      },
      speed: 600,
      // Swiper会自动监测轮播图数量的变化
      observer: true
    });
    request('/slider-list').then(data => {
        this.list = data.data;
    });
  },
  // 组件销毁前，销毁swiper
  beforeDestroy() {
    this.swiper.destroy(true, true);
  }
};
</script>

<style lang="sass">
.swiper-box
  img
    width: 100%
    height: auto
    border-radius: .05rem
  .swiper-pagination
    bottom: .1rem
    .swiper-pagination-bullet
        background: #fff
        &-active
            width: .16rem
            border-radius: .04rem
            background: #2c50a1
            opacity: .6
</style>

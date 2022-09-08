<template>
<!-- viewBox: https://zhuanlan.zhihu.com/p/422609203 -->
<svg width="50" height="50" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="20" stroke-width="3" stroke="hsla(0,0%,100%,.2)" fill="transparent" />
  <circle ref="c" cx="25" cy="25" r="20" stroke-width="3" stroke="#fff" fill="transparent" :style="circleStyle" />
</svg>
</template>

<script>
export default {
  props: {
    // 进度百分比0-100
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // this.$refs.c.getTotalLength()
      l: 40 * Math.PI
    };
  },
  computed: {
    circleStyle() {
      return {
        'stroke-dasharray': this.l,
        // 当percent从0到100变化时，stroke-dashoffset是从总长到0变化
        'stroke-dashoffset': (100 - this.percent) / 100 * this.l
      };
    }
  }
}
</script>

<style scoped lang="sass">
svg
  transform-origin: 50% 50%
  transform: rotate(-90deg)
</style>

<template>
<div class="search-wrapper">
  <!-- 组件的v-model -->
  <my-input v-model="keyword" />
  <!-- <my-input :value="keyword" @input="keyword = $event" /> -->
  {{ searchResult }}
</div>
</template>

<script>
import { debounce, throttle } from '@/utils';
export default {
  data() {
    return {
      keyword: '',
      searchResult: [],
      timeId: null,
      // debounceSearch: debounce(this.search),
      // throttleSearch: throttle(this.search)
    };
  },
  created() {
    // 创建带有防抖/节流功能的搜索方法
    this.debounceSearch = debounce(this.search);
    this.throttleSearch = throttle(this.search);
  },
  methods: {
    search(keyword) {
      this.request('/song-search', 'POST', {
        keyword
      }).then(({ data }) => {
        this.searchResult = data || [];
      });
    }
  },
  watch: {
    keyword(val) {
      // 通过控制事件触发频率，达到优化函数执行效率的效果

      /* 防抖/去抖动/debounce
      在一定时间内，重复触发的事件，只在最后一次执行
      事件来了，判断一下有没有定时器，如果有定时器，把定时器停掉，再重新启动一个定时器
      如果之后没有事件发生了，之前的那个定时间就会到时间触发执行
      */
      // if (this.timeId) {
      //   clearTimeout(this.timeId);
      //   this.timeId = null;
      // }
      // this.timeId = setTimeout(() => {
      //   this.search(val);
      // }, 600);
      this.debounceSearch(val);

      /* 节流/控制流速，降低执行频率/throttle
      重复触发的事件，在一定时间内，最多执行一次
      事件来了，判断一下有没有定时器，如果没有就启动一个，定时器中的逻辑执行时把timeId清空
      */
      // if (!this.timeId) {
      //   this.timeId = setTimeout(() => {
      //     this.search(val);
      //     this.timeId = null;
      //   }, 600);
      // }
      // this.throttleSearch(val);
    }
  }
};
</script>

<style lang="sass">
.search-wrapper
  padding: .4rem
</style>

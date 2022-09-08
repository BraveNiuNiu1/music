<template>
<!-- <div class="detail-view" :class="{ 'open': open }"> -->
<!-- <div :class="{ 'detail-view': true, open }"> -->
<!-- Vue在处理动态的class和style的时候，会将动态的class和静态的class合并，而不是覆盖，可以同时写静态动态的class或style -->
<div class="detail-view" :class="{ open }">
  <my-loading v-if="loading" />
  <template v-else>
    <div
      class="title"
      :style="{ 'background-image': `url(${detail.avatar})` }"
    >
      <div>
        <div class="back" @click="onBack"></div>
        {{ detail.name }}
      </div>
    </div>
    <div
      class="bg"
      :style="{ 'background-image': `url(${detail.avatar})` }"
    ></div>
    <ul>
      <li
        v-for="d in detail.songList"
        :key="d.id"
      >
        <div class="song">{{ d.song }}</div>
        <div class="album">{{ d.singer }} - {{ d.album }}</div>
      </li>
    </ul>
  </template>
</div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        songList: []
      },
      loading: true, // 数据是否正在加载
      open: false
    };
  },
  methods: {
    onBack() {
      this.open = false;
      setTimeout(() => {
        this.$router.go(-1);
        // this.$router.back();
        // history.go(-1);
      }, 300);
    }
  },
  created() {
    this.request('/singer-detail?id=' + this.$route.params.id).then(({ data }) => {
      this.detail = data;
      this.loading = false;
    });
  },
  mounted() {
    setTimeout(() => {
      this.open = true;
    }, 0);
  }
};
</script>

<style lang="sass">
.detail-view
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background: #241b3c
  padding-top: 60vw
  overflow-y: scroll
  transform: translateX(100%)
  transition: .3s
  &.open
    transform: translateX(0)
  .title
    position: fixed
    top: 0
    right: 0
    left: 0
    height: 1.2rem
    background-repeat: no-repeat
    background-position: center top
    background-size: cover
    z-index: 3
    &:before
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      content: ""
      background-color: rgba(0,0,0,.4)
    & > div
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      line-height: 1.2rem
      text-align: center
    .back
      position: absolute
      left: 0
      top: 0
      display: flex
      justify-content: center
      align-items: center
      width: 1.2rem
      height: 1.2rem
      &:after
        content: ""
        width: .3rem
        height: .3rem
        border-left: .06rem solid #fff
        border-bottom: .06rem solid #fff
        transform: rotate(45deg)
  .bg
    position: fixed
    top: 0
    right: 0
    left: 0
    background-color: #000
    background-repeat: no-repeat
    background-position: center top
    background-size: cover
    z-index: 1
    &:after
      content: ""
      display: block
      padding-top: 60%
      background-color: rgba(0,0,0,.4)
  ul
    position: relative
    background: #241b3c
    padding: 20px
    z-index: 2
    li
      position: relative
      & + li
        margin-top: .3rem
      .song
        font-size: .28rem
      .album
        font-size: .24rem
        opacity: .4
</style>

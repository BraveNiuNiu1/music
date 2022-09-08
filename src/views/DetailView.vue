<template>
<div class="detail-view">
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
    };
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.request('/singer-detail?id=' + this.$route.params.id).then(({ data }) => {
      this.detail = data;
      this.loading = false;
    });
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

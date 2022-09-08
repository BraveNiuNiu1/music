<template>
<div class="my-wrapper">
  <div class="tab">
    <router-link to="/my/save">我收藏的</router-link>
    <router-link to="/my/history">我听过的</router-link>
  </div>
  <router-view />
</div>
</template>

<style lang="sass">
.my-wrapper
  .tab
    display: flex
    margin: 20px 20px 0
    border: 1px solid #2c50a1
    border-radius: 5px
    a
      flex: 1
      line-height: 30px
      text-align: center
      font-size: 14px
      color: #999
      transition: background-color, color .3s
      & + a
        border-left: 1px solid #2c50a1
      &.router-link-active
        background-color: #2c50a1
        color: #fff
</style>

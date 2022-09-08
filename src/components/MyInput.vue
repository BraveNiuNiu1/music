<template>
<div class="my-input">
  <input
    placeholder="请输入关键词"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
  <button v-show="value" @click="$emit('input', '')"></button>
</div>
</template>

<script>
export default {
  props: ['value']
};
</script>

<style lang="sass">
.my-input
  position: relative
  height: .8rem
  background: rgba(0,0,0,.6) url(../assets/img/icon-search-line.png) no-repeat .2rem center
  background-size: .4rem
  border-radius: .05rem
  input
    width: 100%
    height: 100%
    padding: 0 .8rem
    background: transparent
    color: #fff
  button
    position: absolute
    top: 0
    right: 0
    width: .8rem
    height: .8rem
    background: transparent url(../assets/img/icon-clear.png) no-repeat center center
    background-size: .4rem
    opacity: .4

</style>

<template>
<div class="my-loading"></div>
</template>

<style lang="sass">
.my-loading
  text-align: center
  &:after
    content: ""
    display: inline-block
    width: .8rem
    height: .8rem
    border: .1rem solid #2c50a1
    border-right-color: #333
    border-radius: 50%
    animation: loading .6s linear infinite

@keyframes loading
  from
    transform: rotate(0)
  to
    transform: rotate(360deg)
</style>

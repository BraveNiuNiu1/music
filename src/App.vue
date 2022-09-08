<template>
  <div id="app">
    <header-nav />
    <main :style="{ 'padding-bottom': $store.state.songList.length ? '1.2rem' : '0' }">
      <router-view />
    </main>
    <mini-player />
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import MiniPlayer from './components/MiniPlayer.vue';
export default {
  components: {
    'header-nav': HeaderNav,
    MiniPlayer
  }
};
</script>

<style>
main {
  position: fixed;
  top: 1.8rem;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}
</style>

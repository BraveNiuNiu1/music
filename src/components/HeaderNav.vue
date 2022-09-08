<template>
<header>
    <div class="logo">
        <span>SEEC MUSIC</span>
    </div>
    <nav>
        <router-link to="/home">首页</router-link>
        <router-link to="/singer">歌手</router-link>
        <router-link to="/search">搜索</router-link>
        <router-link to="/my/save">我的</router-link>
    </nav>
</header>
</template>

<style>
header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
}
.logo span {
    background: url(../assets/img/icon-logo.png) left center no-repeat;
    background-size: .6rem .6rem;
    line-height: .6rem;
    padding-left: .75rem;
    font-size: .24rem;
    font-weight: bold;
}
nav {
    display: flex;
    justify-content: space-between;
    height: .6rem;
    padding: 0 .4rem;
}
nav a {
    display: block;
    line-height: .6rem;
    padding-left: .5rem;
    font-size: .26rem;
    color: #fff;
    background-repeat: no-repeat;
    background-position: left center;
    background-size: .4rem .4rem;
    opacity: .4;
}
/*
  router-link-exact-active 精确匹配，最终的路由
  router-link-active 匹配，父路由
*/
nav a.router-link-active {
    opacity: 1;
}
nav a:nth-child(1) {
    background-image: url(../assets/img/icon-home.png);
}
nav a:nth-child(2) {
    background-image: url(../assets/img/icon-singer.png);
}
nav a:nth-child(3) {
    background-image: url(../assets/img/icon-search.png);
}
nav a:nth-child(4) {
    background-image: url(../assets/img/icon-user.png);
}
</style>

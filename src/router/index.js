import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SingerView from '../views/SingerView.vue';
import SearchView from '../views/SearchView.vue';
import MyView from '../views/MyView.vue';
import DetailView from '../views/DetailView.vue';
import SaveList from '../views/SaveList.vue';
import HistoryList from '../views/HistoryList.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: HomeView
}, {
  path: '/singer',
  component: SingerView, // 在这里定义了子路由，需要在该组件中放置一个router-view组件，用来承接/放置/显示子路由页面
  // 将歌手详情定义为歌手列表的子路由
  children: [{
    path: ':id', // 子路由路径前面没有/
    component: DetailView
  }]
}, {
  path: '/search',
  component: SearchView
}, {
  path: '/my',
  component: MyView,
  children: [{
    path: 'save',
    component: SaveList
  }, {
    path: 'history',
    component: HistoryList
  }]
}];

const router = new VueRouter({
  routes
});

export default router;

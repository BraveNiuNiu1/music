import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 样式文件引入即可
import './assets/style/base.css';
import request from '@/utils/request.js';
import MyInput from '@/components/MyInput.vue';
import MyLoading from '@/components/MyLoading.vue';

Vue.config.productionTip = false;
// 把封装好的ajax请求方法request挂在了Vue构造函数的prototype上，这样所有的组件实例(每个组件都是new Vue构造出来的)都能通过this.request调用这个方法了
Vue.prototype.request = request;

// 注册全局组件
Vue.component('my-input', MyInput);
Vue.component('my-loading', MyLoading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

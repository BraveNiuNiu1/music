const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // 开发跨域配置，代理配置
  devServer: { // 开发服务器
    proxy: { // 代理规则
      '/api': { // URL路径包含/api都会被转发
        target: 'http://m.jxsjs.com' // 远程主机
      }
    }
  }
});

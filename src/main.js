import Vue from 'vue'
import App from './App.vue'
import layer from 'vue-layer'
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
import axios from 'axios';
Vue.prototype.$axios = axios;
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(ElementUI) 
Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

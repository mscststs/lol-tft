import Vue from 'vue';
import App from './app';

import * as lol from "./lol/pack.js";
console.log(lol)

Vue.use(lol);

new Vue({
  render: h => h(App)
}).$mount('#app');

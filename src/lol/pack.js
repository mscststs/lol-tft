import VueRouter from 'vue-router'
export const asyncComponent = import('./index.vue');

export function install(Vue) {
  if (!install.installed) {
    install.installed = true;
    Vue.use(VueRouter);
    Vue.component(
      'lol',
      () => asyncComponent
    );
  }
}

// Create module definition for Vue.use()
const plugin = {
  install
};

// To auto-install when vue is found
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}


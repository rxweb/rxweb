import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'

import { ReactiveFormConfig, ClientLibrary } from '@rxweb/reactive-forms';
Vue.config.productionTip = false;

ReactiveFormConfig.clientLib = ClientLibrary.Vue;

ReactiveFormConfig.set({
    validationMessage: {
        required: "This Field is required",
        alpha: "Only Alpha Numerics are allowed.",
        minLength:"Minimum {{1}} characters you have to enter."
    }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

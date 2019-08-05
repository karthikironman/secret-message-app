import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import login from './components/login.vue'
import home from './components/home.vue'
import footers from './components/footer.vue'
import message from './components/message.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

require("firebase/firestore");

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;





const routes = [
{
  path: '/login',
  component: login ,
  name: 'login'
},
{
  path: '/message',
  component: message ,
  name: 'message'
},
{
  path: '*',
  component: message ,
  name: 'message'
}

];
const router = new VueRouter(
  {
    mode:'history',
    routes,
    base:'/'
  }
);


const firebaseConfig = {
  apiKey: "AIzaSyCe-Ks5izBHCfNtikEMRELrauXyvO6_TvI",
  authDomain: "voting-application-360e6.firebaseapp.com",
  databaseURL: "https://voting-application-360e6.firebaseio.com",
  projectId: "voting-application-360e6",
  storageBucket: "voting-application-360e6.appspot.com",
  messagingSenderId: "1032794419178",
  appId: "1:1032794419178:web:8c27e4e2931ed8ab"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.settings({
  timestampsInSnapshots:true
});
window.db=db;

new Vue({
  BootstrapVue,
  router,
  render:h => h(App)
}).$mount('#app')


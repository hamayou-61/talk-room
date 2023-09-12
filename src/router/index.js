import { createRouter, createWebHistory } from "vue-router";
import EntranceView from '../views/EntranceView.vue'
import RegistView from '../views/RegistView.vue'
import TalkView from '../views/TalkView.vue'
import store from '@/store/index';

const routes = [
  { 
    path: '/',
    name: 'EntranceView',
    component: EntranceView,
    meta: {requiresAuth: false},
  },
  { 
    path: '/regist',
    name: 'RegistView',
    component: RegistView,
    meta: {requiresAuth: false},
  },
  { 
    path: '/talk',
    name: 'TalkView', 
    component: TalkView,
    meta: {requiresAuth: true},
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

router.beforeEach((to, from, next) => {  
  const requireAuth = to.matched.some((record) => record.meta.requiresAuth)

  // ユーザー情報が不要な画面
  if (!requireAuth){
    next()

  // ユーザー情報取得済み
  } else if(store.getters.getAuthentication){
    next()

  } else {
    next({name:'EntranceView'})
  }
})

export default router
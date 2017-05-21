import Vue from 'vue'
import Router from 'vue-router'
import MusicList from '../components/MusicList/MusicList.vue';
import Find from '../components/Find/Find.vue';

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
   {
      path: '/',
      redirect:"/music-list"
    },
    {
      path: '/music-list',
      name: 'MusicList',
      component: MusicList
    },

    {
      path: '/find',
      name: 'Find',
      component: Find
    } 
  ]
})

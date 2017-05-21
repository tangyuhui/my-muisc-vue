<template>
  <div id="app">

    <!-- 主界面部分 -->
    <transition name="show">
      <div  class="index">
        <!-- 头部 -->
        <VHeader></VHeader>
     <!-- router控制的Tab页内容 -->
        <router-view></router-view>
        <VFooter></VFooter>
      </div>
    </transition>

   <AsideMenu v-show="isShowAsideMenu"></AsideMenu>

    <!-- 隐藏的audio标签 -->
    <audio v-bind:src="audio.src || (musicData[0]&&musicData[0].src) || defaultSrc" v-bind:autoplay="isPlaying" ref="audio"></audio>
 
  </div>
</template>

<script>
import VHeader from './components/Header/Header.vue';
import VFooter from './components/Footer/Footer.vue';
import AsideMenu from './components/AsideMenu/AsideMenu.vue';

import {mapState,mapGetters, mapActions} from 'vuex'
export default {
  name: 'app',
  components: {
    VHeader,
    VFooter,
    AsideMenu
  },
  data(){
    return {
      defaultSrc:""
    }
  },
  computed:{
    ...mapState(['isPlaying','audio','musicData','isShowAsideMenu'])
  },
  mounted(){
     this.$store.dispatch('getData');
     this.$store.commit('setDOM',{name:'audio',dom:this.$refs.audio});
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";
 
 .index{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
    height:100%;
 }
 #app{
  height:100%;
 }
</style>

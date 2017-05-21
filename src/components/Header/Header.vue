<template lang="html">
  <div :style="{backgroundColor: skinColor}" class="header">
       <div class="menu"><i class="iconfont icon-mulu" @click="showAsideMenu(true)"></i><div class="name">网易云音乐</div><i class="iconfont icon-sousuo_sousuo" @click="toSearch"></i></div>
       <nav>
         <div v-bind:class="{link: linkBorderIndex==1}" class="item"><router-link to="/music-list" active-class="active">我的</router-link></div>
         <div v-bind:class="{link: linkBorderIndex==2}" class="item"><router-link to="/find" active-class="active">发现</router-link></div>
       </nav>
  </div>
</template>

<script>
 import {mapState,mapGetters, mapActions} from 'vuex'
export default {
  name: 'header',

  data() {
    return {
      index: ''
    };
  },
  computed: {
  ...mapState([
  // 映射 this.count 为 store.state.count
  'linkBorderIndex','skinColor'
    ]) 
  },
  methods: {
    toSearch() {
      this.$router.push('/find');
    },
    showAsideMenu(flag) {
      this.$store.commit('showAsideMenu', flag);
    } 
  }
}
</script>

<style lang="scss" scoped>
   .header{
      color:#fff;
      background-color: #B72712;
       font-size:18px;
          flex: 0 0 auto;
          height:85px;
      .menu{
          height:50px;
         align-items:center;
           display:flex;
           flex-direction:row;
           .icon-mulu{
             font-size:20px;
             margin-left:10px;
           }
          .name{
                text-align:center;
                flex:1;
          }
          .icon-sousuo_sousuo{
             font-size:20px;
            margin-right:10px;
          }
         border-bottom:1px solid rgba(255,255,255,0.3);
       }

      nav{
         background-color: #FFF;
        display:flex;
        text-align:center;  
        color:black;
        align-items:center;
      
        a{
         flex:1;
        }
      .item{
        display:flex;
        flex:1;
         align-items:center;
           padding:5px;
      }
      .link{
          border-bottom:1px solid rgba(255,0,0,0.8);
          &:a{
            color:rgba(255,0,0,0.8);
          }
      }
   }
}
</style>

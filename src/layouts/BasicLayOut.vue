<template>
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view/>
  <van-tabbar v-model="active" active-color="#ee0a24" router @change="onChange">
    <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {ref} from 'vue';
//TODO 改变底部导航栏的时候
const onChange = () => {

};
const active = ref(0);
</script>

<style scoped>

</style>

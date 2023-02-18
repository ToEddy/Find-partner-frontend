<template>
  <van-nav-bar
      left-arrow
      title="TeamPage"
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon dot name="search" size="18"/>
    </template>
  </van-nav-bar>
  在这里可以展示队伍相关的详尽信息
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const onClickLeft = () => {
  router.back();
}
const onClickRight = () => {
  router.push('/team/search')
}
</script>

<style scoped>

</style>

<template>
  <van-nav-bar
      left-arrow
      title="SearchUserPage"
      @click-left="onClickLeft"
  >
    <template #right>
      <Icon color="" size="18" type="md-albums"/>
      "
    </template>
  </van-nav-bar>
  <van-card
      v-for="user in userList"
      :thumb="user.avatar"
      :title="`${user.username}   (${user.email})`"
  >
    <template #desc>
      <div>
        {{ user.userIntro }}
      </div>
    </template>
    <template #tags>
      <van-tag v-for="tag in tags" mark plain style="margin-right: 5px;margin-top: 4px" type="success">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button round size="mini" @click="focusMe">加入TA的队伍</van-button>
    </template>
  </van-card>
  <!-- 顶部弹出 -->
  <van-popup v-model:show="showBottom" :style="{ height: '61%' }" position="bottom">
    <JoinTeam/>
  </van-popup>
  <van-empty v-if="!userList || userList.length <1" description="无用户"/>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import JoinTeam from "./JoinTeam.vue";
import instanceAxios from "../plugins/myAxios.ts";
import Qs from "qs"
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute();
const router = useRouter();
const showBottom = ref(false);
const {tags} = route.query;
const userList = ref([]);

onMounted(async () => {
  const userListData = await instanceAxios.get('/user/searchByTags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: function (params) {
        return Qs.stringify(params, {arrayFormat: 'repeat'})
      }
    }
  })
      .then(function (res) {
        console.log(res);
        showSuccessToast("查找成功");
        //?. 这个会对null 和 undefined 进行校验，如果是其中一个，就会显示空，而不是报错
        return res?.data;
      })
      .catch(function (error) {
        showFailToast("查找失败");
        console.error(error);
      })
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
});

const focusMe = () => {
  showBottom.value = true;
};

const onClickLeft = () => {
  console.log(tags);
  router.back();
}
</script>

<style scoped>

</style>
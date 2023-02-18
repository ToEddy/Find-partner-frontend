<template>
  <van-nav-bar title="UserPage">
    <template #left>
      <van-icon color="" name="service-o" size="18"/>
    </template>
    <template #right>
      <van-icon name="setting-o" size="18" @click="useSetting"/>
    </template>
  </van-nav-bar>
  <template v-if="user">
    <van-cell :value="user.avatar" is-link title="用户头像" to="/user/edit"
              @click="toEdit('avatar','用户头像',user.avatar)"/>
    <van-cell :value="user.username" is-link title="用户昵称" to="/user/edit"
              @click="toEdit('username','用户昵称',user.username)"/>
    <van-cell :value="user.userAccount" is-link title="账号" @click="editAccount()"/>
    <van-popup v-model:show="show">
      <van-field v-model="text" placeholder="请输入新的账号名">
        <template #button>
          <van-button size="mini" type="primary" @click="submitAccount">提交</van-button>
        </template>
      </van-field>
    </van-popup>
    <van-cell :value="user.gender" is-link title="性别" to="/user/edit" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell :value="user.phone" is-link title="电话" to="/user/edit" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell :value="user.email" is-link title="邮箱" to="/user/edit" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell :value="user.createTime" is-link title="账号创建时间" to="/user/edit"/>
    <van-cell :value="user.updateTime" is-link title="账号修改时间" to="/user/edit"/>
  </template>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router'
import instanceAxios from "../plugins/myAxios";


const router = useRouter();
const text = ref('');
const user = ref();
const show = ref(false);
const dateNow = new Date();

onMounted(async () => {
  const res = await instanceAxios.get('/user/current');
  if (res.code === 0) {
    user.value = res.data;
  } else {
    alert('获取用户信息失败');
  }
})
/**
 * 将用户页面的值传递到用户信息编辑页面
 */
const toEdit = (editKey: string, editName: string, editCurrent: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      editCurrent,
    }
  })
}
/**
 * 前端做一个基础的判断账号修改时间是否合法
 */
const editAccount = () => {
  //TODO 有一些繁琐。如果时间不满足要求，则返回要给提示信息，并且在所有的场景下都要给一个上次修改的时间提示
  if ((dateNow.getFullYear() - user.value.createTime.getFullYear()) > 1) {
    show.value = true;
    return;
  }
  if ((dateNow.getFullYear() - user.value.createTime.getFullYear()) === 1) {
    if (dateNow.getMonth() > user.value.createTime.getMonth()) {
      show.value = true;
      return;
    }
    if (dateNow.getMonth() === user.value.createTime.getMonth()) {
      if (dateNow.getDate() >= user.value.createTime.getDate()) {
        show.value = true;
        return;
      }
    }
  }
  alert(`对不起，您上次账号的修改时间是${user.value.updateTime.toLocaleDateString()},不满足一年的时间要求！ `)
}

/**
 提交用户修改的账户名称
 */
const submitAccount = () => {
  //todo  讲修改的账户名称同步到后端

}


const useSetting = () => {
  router.push('/setting');
}

</script>

<style scoped>

</style>

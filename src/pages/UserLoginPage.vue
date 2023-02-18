<template>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          :rules="[{ required: true, message: '请填写账号' }]"
          label="账号"
          name="userAccount"
          placeholder="请输入账号："
      />
      <van-field
          v-model="userPassword"
          :rules="[{ required: true, message: '请填写密码' }]"
          label="密码"
          name="密码"
          placeholder="密码"
          type="password"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button block native-type="submit" round type="primary">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import instanceAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (values) => {
  const res = await instanceAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  console.log(res.data);
  if (res.code === 0) {
    showSuccessToast("登录成功")
    await router.replace('/');
  } else {
    showFailToast('登录失败');
  }
};
</script>

<style scoped>

</style>
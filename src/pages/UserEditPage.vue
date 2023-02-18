<template>
  <van-nav-bar left-arrow title="UserEditPage" @click-left="ReturnToUserPage()"/>
  <van-form @submmit="onSubmit">
    <van-field
        v-model="editUser.editValue"
        :label="editUser.editName"
        :name="editUser.editKey"
        :placeholder="`请输入：${editUser.editName}`"
    />
    <div style="margin: 12px">
      <van-button block native-type="submit" round type="primary">提交</van-button>
    </div>
  </van-form>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import instanceAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  editValue: route.query.editCurrent,
  editName: route.query.editName
});

const onSubmit = async () => {
  const res = await instanceAxios.post('/user/update', {
    'id': 1,
    [editUser.value.editKey]: editUser.value.editValue
  })
  if (res.code === 0 && res.data === true) {
    alert("success")
    showSuccessToast("修改成功");
    router.back();
  } else {
    alert("fail")
    showFailToast("修改失败");
  }
}

const ReturnToUserPage = () => {
  router.push("/user")
}

</script>

<style scoped>

</style>
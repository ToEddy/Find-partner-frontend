<template>
  <form action="/">
    <van-search
        v-model="searchText"
        placeholder="SearchTagsPage"
        show-action
        @cancel="onCancel"
        @search="onSearch"
    />
  </form>
  <van-divider :style="{borderColor:'#1989fa'}" content-position="center">已选标签</van-divider>
  <div v-if="activeTags.length === 0">请选择标签</div>
  <van-row gutter="20">
    <van-col v-for="tag in activeTags" gutter="20">
      <van-tag closeable size="small" type="primary" @close="closeTags(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider :style="{borderColor:'#1989fa'}" content-position="center">可选标签</van-divider>
  <van-tree-select
      v-model:active-id="activeTags"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchFriend">搜索好友</van-button>
  </div>
</template>

<script setup>
//activeTags是勾选由于搜索的标签，tagList是所有的在标签树上展示的标签，originTagList是原始标签
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();
const searchText = ref('');
const activeTags = ref([]);
const activeIndex = ref(0);

//这个是原始标签列表，他保持不变
const originTagList = [
  {
    text: '浙江',
    children: [
      {text: '杭州', id: '杭州'},
      {text: '温州', id: '温州'},
      {text: '宁波', id: '宁波'},
    ],
  },
  {
    text: '江苏',
    children: [
      {text: '南京', id: '南京'},
      {text: '无锡', id: '无锡'},
      {text: '徐州', id: '徐州'},
    ],
  },
  {
    text: '湖北',
    children: [
      {text: '武汉', id: '武汉'},
      {text: '黄冈', id: '黄冈'},
      {text: '襄阳', id: '襄阳'},
      {text: '孝感', id: '孝感'},
      {text: '鄂州', id: '鄂州'},
    ],
  },
  {
    text: '江西',
    children: [
      {text: '南昌', id: '南昌'}
    ],
  },
  {
    text: '湖南',
    children: [
      {text: '长沙', id: '南京'}
    ],
  },
];

let tagList = ref(originTagList);

//搜索标签
const onSearch = (val) => {
  //todo 当搜索一次的时候，我们完全可以查询一次缓存或者数据库，
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};
//清空搜索栏
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
}

//通过标签的删除按钮移除标签
const closeTags = (tag) => {
  activeTags.value = activeTags.value.filter(item => {
    //filter函数需要一个布尔值来判断
    return item !== tag;
  })
};

/**
 * 用户点击搜索的时候，将搜索框的数据传递到SearchUserPage页面
 */
const doSearchFriend = () => {
  router.push({
    path: '/team/search/searchUser',
    query: {
      tags: activeTags.value
    }
  })
}

</script>

<style scoped>

</style>
// 定义一些路由
// 每个路由都需要映射到一个组件。
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import Setting from "../pages/SettingPage.vue";
import SearchTags from "../pages/SearchTagsPage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import SearchUser from "../pages/SearchUserPage.vue";
import Login from "../pages/UserLoginPage.vue";


const routes = [
    {path: '/', component: Index},
    {path: '/team', component: Team},
    {path: '/user', component: User},
    {path: '/setting', component: Setting},
    {path: '/team/search', component: SearchTags},
    {path: '/user/edit', component: UserEdit},
    {path: '/team/search/searchUser', component: SearchUser},
    {path: '/login', component: Login},
]

export default routes;
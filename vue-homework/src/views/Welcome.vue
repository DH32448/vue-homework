<template>
  <div>
    <nav>
      <div style="text-align: center">
        <span style="font-size: 30px">学生成绩管理系统</span>
      </div>
      <hr>
      <div style="display: flex; justify-content: space-around">
        <div>姓名：{{ name }}</div>
        <div>角色：{{ role }}</div>
        <div>图片：<img :src="userPic" alt="用户头像" v-if="userPic"></div>
        <div><button @click="exit">Exit</button></div>
      </div>
    </nav>
    <hr>
  </div>
  <div>
    <div v-if="!loginViews" style="float: left; margin-right: 30px; margin-top: 20px; width: 100%; height: 330px; border: 1px solid red">
      <Adm />
    </div>
    <div v-if="loginViews" style="float: right; margin-right: 30px; margin-top: 20px; width: 30%; height: 200px; border: 1px solid red">
      <Login @login-success="getUserInfo" />
    </div>
  </div>
</template>

<script>
import { getUserInfo ,deleteAccessToken} from '../axios/index.js';
import Login from "@/views/Login.vue";
import Adm from "@/views/adm/Adm.vue";
export default {
  components: {Login,Adm},
  data() {
    return {
      name: '请登录',
      role: '',
      userPic: '',
      loginViews:true
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      const tokenStr = localStorage.getItem('acc_token');
      if (!tokenStr) {
        console.error('用户未登录，请先登录');
        return;
      }

      getUserInfo(
          (userInfo) => {
            console.log('用户信息:', userInfo);
            this.name = userInfo.uname || '无名';
            this.role = userInfo.role || '未知';
            this.userPic = userInfo.pic || '';
            this.loginViews = false;
          },
          (message, code, url) => {
            console.error('获取用户信息失败:', message, code, url);
          }
      );
    },
    exit(){
      deleteAccessToken();
      this.name = '请登录';
      this.role = '';
      this.userPic = '';
      this.loginViews = true;
    }
  }
};
</script>
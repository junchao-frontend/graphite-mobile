<template>
  <div class="box">
    <!--  -->
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="account"
          name="account"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="checkbox">
          <van-checkbox van-checkbox v-model="checked" shape="square" >记住我</van-checkbox>
        </div>
        <div class="login-btn">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/production/login';
import { hbLogin } from '@/api/environment/login.js';
export default {
  name: "login-view",
  components: {},
  props: [],
  data() {
    return {
      account: "test",
      password: "12345678",
      checked: true,
    };
  },
  methods: {
    onSubmit(values) {
      // this.$axios.post('/api/user/login',values).then( res => {
      //   if(res.data.code === 200){
      //     localStorage.setItem('token', res.data.token)
      //     this.$router.push('/')
      //   }
      // })
      const body = {
        account: 'admin',
        password: 'rtts12598'
      }
      hbLogin(body).then(res => {
        // console.log(res, '-----');
        const token = res.data.data.token
        localStorage.setItem('env-token', token)
      })
      userLogin(values).then(res => {
        localStorage.setItem('token', res.data.data.token)
        this.$router.push('/')
      })
    },


  },
};
</script>

<style scoped>
.box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-btn {
  margin-top: 140px;
}
.checkbox{
  padding: 16px;
  margin-top: 10px;
}
</style>

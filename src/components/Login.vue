<template>
  <div  v-on:keyup.enter="handleSubmit()" class="login fit-parent">
    <Form class="login__form" ref="formInline" :model="loginForm" :rules="ruleInline">
      <FormItem>
        <h3 class="login__title">农场养殖流程端</h3>
      </FormItem>
      <FormItem prop="user">
        <Input type="text" v-model="loginForm.user" placeholder="请输入用户名">
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
        </Input>
      </FormItem>
      <div class="login__error">{{loginForm.errMsg}}</div>
      <FormItem>
        <Button long type="primary" @click="handleSubmit">
          <span v-if="!loading">登录</span>
          <span v-else>登录中...</span>
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      loginForm: {
        user: '',
        password: '',
        errMsg: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
     handleSubmit () {
        this.$router.replace({ path: '/index/index-message' })
     }

  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  background-image: url(../assets/img/green.jpg);
  text-align: center;

  &__title {
    color: white;
    font-size: 30px;
  }

  &__form {
    width: 300px;
    height: 300px;
    margin: auto;
    margin-top: 200px;
  }

  &__error {
    text-align: left;
    color: red;
    margin-bottom: 5px;
  }
}
</style>


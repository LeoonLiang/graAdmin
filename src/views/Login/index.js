// import axios from 'axios'
import store from '@/vuex/store'
export default {
    data () {
        return {
          loginForm: {
            account: 'admin',
            password: 'admin',
            type:102
          },
          store,
          // 表单验证规则：
          rules: {
            account: [
              { required: true, message: '用户名为必填项', trigger: 'blur' },
            ],
            password: [
              { required: true, message: '密码为必填项', trigger: 'blur' },
            ]
          },
    
          // 表单标签文字提示的位置
          labelPosition: 'top'
        }
      },
      methods: {
        /**
         * 登录方法
         */
        login () {
          // 表单校验的代码：
          // 先进行表单验证，验证成功后，再进行登录
          // console.log(this.$refs.loginForm)
    
          // this.$refs.loginForm 是用来获取到页面中的组件或DOM对象
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              // 表单验证成功时执行的代码
              this.handleLogin()
            } else {
              // 表单验证失败的代码
              return false
            }
          })
        },
    
        /**
         * 登录逻辑
         */
        async handleLogin () {
          const url = '/v1/token'
          // 使用 await 等待这个异步请求成功：
          try{
            const res = await this.$http.post(url, this.loginForm)
            if (res.status === 200) {
              // 成功：
              const data = res.data
              // console.log(data)
              // localStorage.setItem('token', data.token)
              store.commit('saveToken', data)
              localStorage.setItem('token', data.token)
              localStorage.setItem('uid', data.uid)
              this.$router.push('/')
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 500
              })
            }
          }
          catch(e){
            this.$message({
              message: '登录失败：用户名或密码错误',
              type: 'error',
              duration: 1000
            })
          }
          // 从 res 中获取到成功后的数据:
        },
    
        /**
         * 重置
         */
        reset () {
          this.$refs.loginForm.resetFields()
        }
      }
}
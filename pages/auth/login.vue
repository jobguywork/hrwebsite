<template>
  <div class="page-login layout-v layout-center-center">
    <div class="wrap-auth rtl">
      <h1 class="welcome text-center mb-20">خوش آمدید!</h1>
      <ElCard v-loading="loading" class="box-auth">
        <el-form
          ref="form"
          type="post"
          :model="form"
          :rules="rules"
          @submit.native.prevent="onSubmit"
        >
          <div class="form layout-v">
            <!-- email -->
            <el-form-item prop="email" class="field">
              <label for="email">ایمیل</label>
              <ElInput
                id="email"
                v-model="form.email"
                name="email"
                class="ltr"
                placeholder="e.g name@company.com"
              />
            </el-form-item>
            <!-- /email -->

            <!-- password -->
            <div prop="password" class="field">
              <label for="password">کلمه عبور</label>
              <ElInput
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                class="ltr"
                placeholder="******"
              />
            </div>
            <!-- /password -->

            <!-- submit -->
            <div class="field submit">
              <ElButton
                :loading="loading"
                native-type="submit"
                class="full-width"
                type="primary"
              >
                ورود
              </ElButton>
            </div>
            <!-- /submit -->
          </div>
        </el-form>
      </ElCard>
      <div class="links mt-20">
        <nuxt-link to="/auth/forget-password">
          رمز عبور خود را فراموش کردید؟
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'notAuthenticated',
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null
      },
      rules: {
        email: [
          {
            required: true,
            message: 'این فیلد اجباری است.',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'آدرس صحیح وارد نمایید',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: 'این فیلد اجباری است.',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true
        const { data } = await this.$axios.$post(
          '/authnz/login_email/',
          this.form
        )

        this.$cookies.set('user', data, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })

        this.$store.dispatch('auth/setAuth', data)
        this.$axios.setToken(data.token, 'JWT')

        this.$store.dispatch('company/getCompany')

        this.$notify({
          message: 'خوش آمدید!',
          type: 'success'
        })
        this.$router.push('/')
      } catch (error) {
        this.$notify({
          message: 'کلمه عبور یا نام کاربری اشتباه است.',
          type: 'danger'
        })
      } finally {
        this.loading = false
      }
    }
  },
  head() {
    return {
      title: 'ورود'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-login {
  height: 100vh;
  .welcome {
    color: #333;
  }
  .wrap-auth {
    margin-top: -50px;
    .box-auth {
      width: 400px;
      height: 300px;
    }
  }
}
</style>

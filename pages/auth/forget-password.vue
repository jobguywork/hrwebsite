<template>
  <div class="page-login layout-v layout-center-center">
    <div class="wrap-auth rtl">
      <h1 class="welcome text-center mb-20">فراموشی کلمه عبور</h1>
      <ElCard class="box-auth">
        <el-form ref="form" :model="form" :rules="rules">
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
              ></ElInput>
            </el-form-item>
            <!-- /email -->

            <!-- submit -->
            <div class="field submit">
              <ElButton
                :loading="btnLoading"
                class="full-width"
                type="primary"
                @click="submit"
              >
                ارسال
              </ElButton>
            </div>
            <!-- /submit -->
          </div>
        </el-form>
      </ElCard>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'notAuthenticated',
  data() {
    return {
      btnLoading: false,
      form: {
        email: null
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
        ]
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$axios.$post('/authnz/forgot_password/', this.form)

        this.$notify({
          message: 'کد برای شما ایمیل شد.',
          type: 'success'
        })
        this.$router.push('/auth/reset-password')
      } catch (error) {
        this.$notify({
          message: 'کلمه عبور یا نام کاربری اشتباه است.',
          type: 'danger'
        })
      }
    }
  },
  head() {
    return {
      title: 'فراموشی کلمه عبور'
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
      height: 200px;
    }
  }
}
</style>

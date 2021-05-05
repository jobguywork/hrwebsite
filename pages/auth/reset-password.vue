<template>
  <div class="page-login layout-v layout-center-center">
    <div class="wrap-auth rtl">
      <h1 class="welcome text-center mb-20">تغییر کلمه عبور</h1>
      <ElCard class="box-auth">
        <el-form ref="form" :model="form" :rules="rules">
          <div class="form layout-v">
            <!-- email -->
            <el-form-item prop="token" class="field">
              <label for="token">کد ارسالی</label>
              <ElInput
                id="token"
                v-model="form.token"
                name="token"
                class="ltr"
                placeholder="کد ارسالی"
              ></ElInput>
            </el-form-item>
            <!-- /email -->

            <!-- email -->
            <el-form-item prop="email" class="field">
              <label for="email">ایمیل</label>
              <ElInput
                id="email"
                v-model="form.email"
                name="email"
                class="ltr"
                placeholder="ایمیل"
              ></ElInput>
            </el-form-item>
            <!-- /email -->

            <!-- password -->
            <div prop="password" class="field">
              <label for="password">کلمه عبور جدید</label>
              <ElInput
                id="password"
                v-model="form.password"
                name="password"
                class="ltr"
                placeholder="******"
              ></ElInput>
            </div>
            <!-- /password -->

            <!-- submit -->
            <div class="field submit">
              <ElButton
                :loading="btnLoading"
                class="full-width"
                type="primary"
                @click="submit"
              >
                ذخیره
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
      form: {},
      rules: {
        email: [
          {
            required: true,
            message: 'این فیلد اجباری است.',
            trigger: 'blur'
          }
        ],
        token: [
          {
            required: true,
            message: 'این فیلد اجباری است.',
            trigger: 'blur'
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
    async submit() {
      try {
        await this.$axios.$post(
          '/authnz/change_password_with_token/',
          this.form
        )

        this.$notify({
          message: 'کلمه عبور ذخیره شد.',
          type: 'success'
        })
        this.$router.push('/auth/login')
      } catch (error) {
        this.$notify({
          message: 'خطایی پیش آمده است.',
          type: 'danger'
        })
      }
    }
  },
  head() {
    return {
      title: 'تغییر کلمه عبور'
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
      height: 420px;
    }
  }
}
</style>

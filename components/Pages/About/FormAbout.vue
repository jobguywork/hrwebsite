<template>
  <el-form ref="form" :model="form" :rules="rules" class="about-form">
    <!-- info -->
    <div
      v-if="cover"
      class="cover layout-h layout-center"
      :style="{ backgroundImage: 'url(' + cover + ')' }"
    >
      <!-- logo-wrap -->
      <div class="logo-wrap mr-30 layout-v layout-wrap">
        <div class="logo">
          <img
            v-if="form.logo"
            :width="80"
            :height="80"
            :src="form.logo | mediaUrl"
          />
        </div>
        <div class="change layout-h layout-center-center text-center">
          <el-form-item prop="logo">
            <client-only>
              <Crop
                v-model="form.logo"
                :width="250"
                :height="250"
                btn-name="تغییر لوگو"
                :no-circle="true"
                :no-square="true"
              />
            </client-only>
          </el-form-item>
        </div>
      </div>
      <!-- /logo-wrap -->
      <client-only>
        <Crop
          v-model="form.cover"
          class="change-cover-btn"
          btn-name="تغییر کاور"
          :width="1920"
          :height="350"
          :no-circle="true"
          :no-square="true"
        />
      </client-only>
    </div>
    <el-card class="box-card mt-20 mb-30">
      <!-- header -->
      <div slot="header" class="clearfix">
        <i class="fas fa-building fa-lg"></i>
        <span class="title mr-5">اطلاعات شرکت</span>
      </div>
      <!-- /header -->

      <!-- body -->
      <div class="body layout-h">
        <!-- form-wrap -->
        <div class="form-wrap rtl">
          <ElRow :gutter="30" type="flex">
            <ElCol :span="12">
              <div class="field">
                <label for="city">شهر</label>
                <el-form-item prop="city">
                  <City id="city" v-model="form.city.name" class="full-width" />
                </el-form-item>
              </div>
            </ElCol>
            <ElCol :span="12">
              <div class="field">
                <label for="tell">تلفن</label>
                <el-form-item prop="tell">
                  <ElInput
                    id="tell"
                    v-model="form.tell"
                    class="ltr"
                    placeholder="021-33606060"
                  />
                </el-form-item>
              </div>
            </ElCol>
          </ElRow>

          <ElRow :gutter="30" type="flex">
            <ElCol :span="12">
              <div class="field">
                <label for="size">تعداد کارمند</label>
                <el-form-item prop="size">
                  <CompanySize
                    id="size"
                    v-model="form.size"
                    class="full-width"
                  />
                </el-form-item>
              </div>
            </ElCol>
            <ElCol :span="12">
              <div class="field">
                <label for="site">وب سایت</label>
                <el-form-item prop="site">
                  <ElInput
                    id="site"
                    v-model="form.site"
                    class="ltr"
                    placeholder="https://test.com"
                  />
                </el-form-item>
              </div>
            </ElCol>
          </ElRow>

          <ElRow :gutter="30" type="flex">
            <ElCol :span="12">
              <div class="field">
                <label for="founded">سال تاسیس</label>
                <el-form-item prop="founded">
                  <el-date-picker
                    v-model="form.founded"
                    class="full-width"
                    type="year"
                    placeholder="سال تاسیس"
                  />
                </el-form-item>
              </div>
            </ElCol>
            <ElCol :span="12">
              <div class="field">
                <label for="industry">فعالیت در زمینه</label>
                <el-form-item prop="industry">
                  <Industry v-model="form.industry.name" class="full-width" />
                </el-form-item>
              </div>
            </ElCol>
          </ElRow>

          <ElRow>
            <ElCol :span="24">
              <div class="field">
                <label for="benefit">مزایا</label>
                <el-form-item prop="benefit">
                  <Benefit v-model="form.benefit" class="full-width" />
                </el-form-item>
              </div>
            </ElCol>
          </ElRow>
        </div>
        <!-- /form-wrap -->
      </div>
      <!-- /body -->
    </el-card>
    <!-- /info -->

    <el-card class="box-card mb-30">
      <!-- header -->
      <div slot="header" class="clearfix">
        <i class="fas fa-pencil-alt fa-lg"></i>
        <span class="title mr-5">درباره شرکت</span>
      </div>
      <!-- /header -->

      <!-- body -->
      <div class="body layout-h">
        <el-form-item prop="description">
          <client-only placeholder="در حال بارگزاری...">
            <ckeditor
              v-model="form.description"
              :editor="editor"
              :config="editorConfig"
            />
          </client-only>
        </el-form-item>
      </div>
      <!-- /body -->
    </el-card>

    <ElButton type="primary" @click="submit">بروزرسانی</ElButton>
  </el-form>
</template>

<script>
import moment from 'moment'

import Crop from '@/components/Common/Crop'
import Industry from '@/components/Common/Industry'
import CompanySize from '@/components/Common/CompanySize'
import Benefit from '@/components/Common/Benefit'
import City from '@/components/Common/City'
let ClassicEditor = null
if (process.client) {
  require('@ckeditor/ckeditor5-build-classic/build/translations/fa')
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

export default {
  components: {
    Industry,
    CompanySize,
    Benefit,
    City,
    Crop
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        language: 'fa'
      },
      form: {
        logo: '',
        size: '',
        industry: {
          name: ''
        },
        city: {
          name: ''
        },
        benefit: []
      },
      rules: {
        logo: [
          { required: true, message: 'فیلد لوگو الزامی است.', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'فیلد شهر الزامی است.', trigger: 'blur' }
        ],
        size: [
          {
            required: true,
            message: 'فیلد تعداد کارمند الزامی است.',
            trigger: 'blur'
          }
        ],
        founded: [
          {
            required: true,
            message: 'فیلد سال تاسیس الزامی است.',
            trigger: 'blur'
          }
        ],
        industry: [
          {
            required: true,
            message: 'فیلد فعالیت در زمینه الزامی است.',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: 'فیلد درباره ما الزامی است.',
            trigger: 'blur'
          }
        ]
      },
      configTextEditor: {
        direction: 'rtl',
        attribution: false,
        height: 300,
        language: 'fa'
      },
      model: 'شرکت اسنپ.'
    }
  },
  computed: {
    cover() {
      return this.$options.filters.mediaUrl(this.form.cover)
    }
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    async getCompany() {
      const slug = this.$currentUser.admin_of_company.company_slug
      const { data } = await this.$axios.$get(`/public/company/${slug}/`)
      this.form = data
      if (data.founded === 'سال نامشخص') {
        this.form.founded = null
      } else {
        this.form.founded = moment(this.form.founded, 'YYYY').toISOString()
      }
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const ID = this.$currentUser.admin_of_company.id
            if (this.form.founded === 'سال نامشخص') {
              delete this.form.founded
            } else {
              this.form.founded = moment(this.form.founded).format('YYYY-MM-DD')
            }
            if (this.form.tell === '') {
              delete this.form.tell
            }
            delete this.form.gallery
            this.form.benefit = this.form.benefit.map((item) => {
              return { name: item }
            })
            await this.$axios.$put(`/company/${ID}/update/`, this.form)
            this.$notify({
              message: 'اطلاعات با موفقیت ذخیره شد.',
              type: 'success'
            })
          } catch (error) {}
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.about-form {
  .cover {
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.75);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 350px;
    position: relative;
    .change-cover-btn {
      position: absolute;
      left: 20px;
      bottom: 20px;
    }
    .logo-wrap {
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
      padding: 10px 25px;
      padding-bottom: 15px;
      background-color: #fff;
      border-radius: 4px;
      .logo {
        img {
          width: 80px;
          height: 80px;
          border-radius: 4px;
        }
      }
      ::v-deep {
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
  .body {
    .form-wrap {
      width: 100%;
    }
    ::v-deep {
      .el-form-item {
        width: 100%;
      }
    }
  }
}
</style>

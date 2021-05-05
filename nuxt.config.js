export default {
  mode: 'universal',
  server: {
    port: 3001
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'جاب‌گای',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width' },
      {
        hid: 'description',
        name: 'description',
        content:
          'جستجو و اشتراک دیدگاه ها در رابطه با استخدام، حقوق، تجربه کاری، مزایا و معایب در شرکت های ایرانی'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '/fonts/vazir/font.css'
      },
      {
        rel: 'stylesheet',
        href: '/fonts/fontawesome/css/all.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./assets/styles/index.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios',
    '@/mixins/index.js',
    '@/plugins/element-ui',
    {
      src: '@/plugins/masonry',
      mode: 'client'
    },
    {
      src: '@/plugins/crop',
      mode: 'client'
    },
    {
      src: '@/plugins/ckeditor',
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://api.jobguy.work'
        : 'https://api.jobguy.work'
  },
  /*
   ** Build configuration
   */
  build: {
    // hardSource: process.env.NODE_ENV === 'development',
    // cache: process.env.NODE_ENV === 'development',
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            enforce: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  styleResources: {
    scss: [
      './assets/styles/variables/_variables.scss',
      './assets/styles/utilities/_responsive.scss'
    ]
  }
}

export default function({ app: { $axios, $cookies }, redirect, isDev }) {
  $axios.setHeader('Content-Type', 'application/json')

  const user = $cookies.get('user')
  if (user) {
    $axios.setToken(user.token, 'JWT')
  }
}

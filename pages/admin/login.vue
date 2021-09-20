<template>
  <div class="page">
    <header class="flex justify-between bg-gray-700 text-white">
      <p class="md:text-center">
        <img src="/logo-gray.png" class="w-28 m-2">
      </p>
      <p class="p-8">ようこそ{{ user.name }}さん</p>
      <button @click="logout()">ログアウト</button>
    </header>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:w-4xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative max-w-xl px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="w-80 mx-auto">
            <p class="h-7 sm:h-8 font-bold">管理画面ログイン</p>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>E-mail</p>
                <input v-model="email" name="email" type="text" class="w-full">
                <p>パスワード</p>
                <input v-model="password" name="password" type="password" class="">
                <div>
                  <button @click="login()" class="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <!-- Heroicon name: solid/lock-closed -->
                      <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    ログイン
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
    },
    logout () {
      this.$fire.auth.signOut().then(() => {
        this.$store.dispatch('logout')
        alert('ログアウトしました。')
      }).catch((error) => {
        alert('ログアウトエラー：' + error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

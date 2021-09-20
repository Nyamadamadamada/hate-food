<template>
  <form
    class="w-full max-w-sm"
    @submit.prevent="searchFood"
  >
    <div class="flex items-center  py-2">
      <input v-model="textKeyword" class="appearance-none bg-transparent border-none w-full text-gray-700 bg-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="食材・料理名">
      <input
        :disabled="disableSearchFood"
        class="disabled:opacity-40 disabled:cursor-default flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm text-white bg-gray-700 py-1 px-2 rounded"
        type="submit"
        value="検索"
      >
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      textKeyword: this.$route.query.q ? this.$route.query.q : ''
    }
  },
  computed: {
    disableSearchFood () {
      if (this.textKeyword.length > 0) {
        return false
      }
      return true
    }
  },
  created () {
    if (this.textKeyword) {
      this.$store.commit('setkeyword', { keyword: this.textKeyword })
      this.$store.dispatch('searchFood', { keyword: this.textKeyword })
    }
  },
  methods: {
    searchFood () {
      this.$store.commit('setkeyword', { keyword: this.textKeyword })
      // indexのときcreatedにより２回dispachされるのを防ぐ
      if (this.$route.name !== 'index') {
        this.$store.dispatch('searchFood', { keyword: this.textKeyword })
      }
      this.$router.push({ path: '/list/search', query: { q: this.textKeyword } })
    }
  }
}
</script>

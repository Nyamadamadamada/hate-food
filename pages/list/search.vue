<template>
  <div class="m-auto">
    <div class="mb-4 bg-gray-100">
      <h1 class="text-center text-3xl md:text-4xl py-4 text-gray-800">
        「{{ $route.query.q }}」<br>
        <span class="text-2xl md:text-3xl">の検索結果</span>
      </h1>
      <div class="mx-auto mb-10 md:mb-16">
        <!-- 検索結果 -->
        <div v-if="searchArr.length > 0" class="w-full flex flex-wrap md:flex-row justify-center sm:py-4">
          <div v-for="(data,index) in searchArr" :key="index" class="p-3">
            <div class="sm:max-w-sm sm:mx-auto md:max-w-md bg-white shadow-lg rounded md:rounded-3xl sm:p-4">
              <nuxt-link :to="{ name: 'vote-id', params: { id: data[0] } }">
                <div class="max-w-md mx-auto">
                  <search-img
                    :image="data[2]"
                  />
                  <div class="divide-y divide-gray-200">
                    <div class="p-2 md:pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                      <p class="text-gray-800 md:hover:text-gray-600">{{ data[1] }}&rarr;</p>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 md:py-6">
          <p>一致する検索結果はありません。<br>関連キーワードを試してください。（例:野菜、豆、緑）</p>
        </div>
      </div>
    </div>
    <div class="container mx-auto">
      <section class="mx-auto my-10 md:my-16 px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">最近投票されたニガテ食材</h2>
        <!-- 最近投票されたニガテ食材 -->
        <div class="mt-2 md:mt-6 grid gap-y-10 gap-x-6 grid-cols-3 lg:grid-cols-4 xl:gap-x-8 mx-auto max-w-2xl lg:max-w-7xl">
          <div v-for="(data,index) in dbDataUpdate" :key="index" class="group relative last:hidden lg:last:block">
            <list-food
              :id="data[0]"
              :name="data[1]"
              :update="data[2]"
              :image="data[3]"
              :index="index"
            />
          </div>
        </div>
      </section>
      <section class="mx-auto my-10 md:my-16 px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">新着ニガテ食材</h2>
        <!-- 新着ニガテ食材 -->
        <div class="mt-2 md:mt-6 grid gap-y-10 gap-x-6 grid-cols-3 lg:grid-cols-4 xl:gap-x-8 mx-auto max-w-2xl lg:max-w-7xl">
          <div v-for="(data,index) in dbDataNew" :key="index" class="group relative last:hidden lg:last:block">
            <list-food
              :index="index"
              :id="data[0]"
              :name="data[1]"
              :image="data[2]"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fire: this.$fire.firestore.collection('foods'),
      keyword: this.$store.getters.keyword,
      dbDataUpdate: '',
      dbDataNew: ''
    }
  },
  async fetch () {
    const dbDataNew = []
    const storageRef = this.$fire.storage.ref()
    this.dbDataNew = dbDataNew
    // 作成日時順
    await this.fire.orderBy('create_date', 'desc').limit(4).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const array = []
          array.push(doc.id) // 0:id
          array.push(doc.data().name) // 1:食材名・料理名
          const image = storageRef.child(doc.data().image)
          image.getDownloadURL()
            .then((url) => {
              array.push(url) // 3:画像
            })
            .catch(function () {
              array.push('/food/sample.png') // 3:画像
            })
          dbDataNew.push(array)
        })
      })
    const dbDataUpdate = []
    this.dbDataUpdate = dbDataUpdate
    await this.fire.orderBy('update_date', 'desc').limit(4).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const array = []
          array.push(doc.id) // 0:id
          array.push(doc.data().name) // 1:食材名・料理名
          const date = new Date(doc.data().update_date.toDate())
          const update = date.getFullYear() +
            '/' + (date.getMonth() + 1) +
            '/' + date.getDate() +
            ' ' + date.getHours() +
            ':' + date.getMinutes() +
            ':' + date.getSeconds()
          array.push(update) // 2:更新時間
          const image = storageRef.child(doc.data().image)
          image.getDownloadURL()
            .then((url) => {
              array.push(url) // 3:画像
            })
            .catch(function () {
              array.push('/food/sample.png') // 3:画像
            })
          dbDataUpdate.push(array)
        })
      })
  },
  computed: {
    searchArr () {
      return this.$store.getters.searchFoods
    }
  }
}
</script>

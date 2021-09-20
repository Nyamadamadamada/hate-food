<template>
  <div class="page">
    <header class="flex justify-between bg-gray-700 text-white">
      <p class="md:text-center">
        <img src="/logo-gray.png" class="w-28 m-2">
      </p>
      <p class="p-8">ようこそ{{ user.name }}さん</p>
      <button v-if="user.login" @click="logout()">ログアウト</button>
    </header>
    <div class="w-11/12 flex flex-col m-auto">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <h2 class="">新規登録・編集</h2>
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
                <input type="text" v-model="id" class="mt-1  block w-full shadow-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6">
                <label for="name" class="block text-sm font-medium text-gray-700">食材・料理名</label>
                <input type="text" v-model="name" class="mt-1  block w-full shadow-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="hate-google" class="block text-sm font-medium text-gray-700">嫌いGoogle件数</label>
                <input type="number" v-model="hateGoogle" class="mt-1  block w-full shadow-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="fa-google" class="block text-sm font-medium text-gray-700">好きGoogle件数</label>
                <input type="number" v-model="faGoogle" class="mt-1  block w-full shadow-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6">
                <label for="image" class="block text-sm font-medium text-gray-700">画像</label>
                <input type="text" v-model="image" class="mt-1  block w-full shadow-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6">
                <label for="tags" class="block text-sm font-medium text-gray-700">タグ[カンマで区切って入力する。例：食べ物,夏野菜,味が薄い]</label>
                <input type="text" v-model="tags" class="mt-1  block w-full shadow-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6">
                <label for="keywords" class="block text-sm font-medium text-gray-700">検索用ワード（検索時にヒットするようにする）</label>
                <input type="text" v-model="keywords" class="mt-1  block w-full shadow-sm border-gray-300 rounded-md">
              </div>
            </div>
          </div>
          <div class="flex w-full">
            <div class="w-full px-8 py-3 bg-gray-50 text-left sm:px-6">
              <button @click="clearForm()" class="inline-flex justify-center py-2 px-4 text-white border border-transparent shadow-sm text-sm font-medium rounded-md bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                クリア
              </button>
            </div>
            <div class="w-full px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button @click="insertFood()" type="submit" class="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                登録
              </button>
              <button @click="editFood()" type="submit" class="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                編集
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-11/12 flex flex-col m-auto">
      <div class="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <h2>食材・料理名一覧</h2>
            <button @click="showList()" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              一覧を表示
            </button>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    食材・料理名
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hate投票<br>嫌いgoogle件数
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    好き投票<br>好きgoogle件数
                  </th>
                  <th scope="col" class="relative px-6 py-3"></th>
                  <th scope="col" class="relative px-6 py-3"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(date,index) in dbData" :key="index">
                  <td class="px-1 py-4">
                    <div class="h-10 w-10">
                      {{ date[0] }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        {{ date[1] }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ date[3] }}</div>
                    <div class="text-sm text-gray-500">{{ date[4] }}件</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ date[5] }}</div>
                    <div class="text-sm text-gray-500">{{ date[6] }} 件</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button @click="selectFood(index)" class="text-blue-600 hover:text-blue-900">編集</button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="deleteFood(index)" class="text-indigo-600 hover:text-indigo-900">削除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware ({ store, redirect }) {
    if (!store.getters.user.login) {
      redirect('/admin/login')
    }
  },
  data () {
    return {
      id: '',
      name: '',
      hateGoogle: 0,
      faGoogle: 0,
      image: '',
      tags: '',
      keywords: '',
      //  fire: this.$fire.firestore.collection(`/foods/${this.$store.getters.user.uid}`),
      dbData: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$fire.auth.signOut().then(() => {
        this.$store.dispatch('logout')
        this.$router.push('/admin/login')
      }).catch((error) => {
        alert('ログアウトエラー：' + error)
      })
    },
    insertFood () {
      const tagArr = this.tags.split(',')
      const keywordsArr = this.keywords.split(',')
      const hateRatio = parseInt(this.hateGoogle) / (parseInt(this.hateGoogle) + parseInt(this.faGoogle)) * 100
      const fire = this.$fire.firestore.collection('foods')
      const dt = new Date()
      fire.doc(this.id).set({
        name: this.name,
        google_fa_vote: this.faGoogle,
        google_hate_vote: this.hateGoogle,
        hate_vote: 1,
        fa_vote: 1,
        image: this.image,
        tags: tagArr,
        keywords: keywordsArr,
        create_date: dt,
        update_date: dt,
        hate_ratio: hateRatio
      }).catch((error) => {
        alert('Error writing document: ' + error)
      })
      // 初期化
      this.id = ''
      this.name = ''
      this.hateGoogle = 0
      this.faGoogle = 0
      this.image = ''
      this.tags = ''
      this.keywords = ''
    },
    editFood () {
      const fire = this.$fire.firestore.collection('foods')
      const tagsArr = this.tags.split(',')
      const keywordsArr = this.keywords.split(',')
      const dt = new Date()
      fire.doc(this.id).update({
        name: this.name,
        google_fa_vote: this.faGoogle,
        google_hate_vote: this.hateGoogle,
        image: this.image,
        tags: tagsArr,
        keywords: keywordsArr,
        update_date: dt
      }).catch((error) => {
        alert('Error writing document: ' + error)
      })
    },
    selectFood (index) {
      this.id = this.dbData[index]['0']
      this.name = this.dbData[index]['1']
      this.tags = this.dbData[index]['2'].join(',')
      this.hateGoogle = this.dbData[index]['4']
      this.faGoogle = this.dbData[index]['6']
      this.image = this.dbData[index]['7']
      this.keywords = this.dbData[index]['8'].join(',')
    },
    showList () {
      const fire = this.$fire.firestore.collection('foods')
      const dbData = []
      this.dbData = dbData
      fire
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            const array = []
            array.push(doc.id)// 0:id
            array.push(doc.data().name)// 1:食材・料理名
            array.push(doc.data().tags)// 2:タグ
            array.push(doc.data().hate_vote)// 3:嫌い票
            array.push(doc.data().google_hate_vote)// 4:Google嫌い件数
            array.push(doc.data().fa_vote)// 5:好き票
            array.push(doc.data().google_fa_vote)// 6:Google好き件数
            array.push(doc.data().image)// 7:画像パス
            array.push(doc.data().keywords)// 8:検索ワード
            dbData.push(array)
          })
        })
    },
    deleteFood (index) {
      const fire = this.$fire.firestore.collection('foods')
      fire.doc(this.dbData[index][0]).delete().then(() => {
        alert(this.dbData[index][1] + 'を削除しました。再読み込んでください')
      }).catch((error) => {
        alert('Error removing document: ' + error)
      })
    },
    clearForm () {
      // 初期化
      this.id = ''
      this.name = ''
      this.hateGoogle = 0
      this.faGoogle = 0
      this.image = ''
      this.tags = ''
      this.keywords = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

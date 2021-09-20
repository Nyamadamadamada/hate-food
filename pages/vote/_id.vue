<template>
  <div class="container m-auto">
    <h1 class="my-5 md:my-3 text-2xl md:text-3xl text-center">
      <span class="text-3xl md:text-4xl font-bold">{{ dbData[0] }}</span>はまずい？嫌い？ニガテ？
    </h1>
    <div class="food relative">
      <div class="food-tags absolute bottom-2 left-2">
        <ul>
          <li v-for="(tag,index) in dbData[1]" :key="index">
            <a class="cursor-default"><span class="whitespace-no-wrap">{{ tag }}</span><span class="bg"></span></a>
          </li>
        </ul>
      </div>
      <div class="food-img m-auto bg-gray-200">
        <img :src="dbData[6]" class="m-auto">
      </div>
    </div>
    <div v-if="!isClickvote" class="my-10">
      <div class="flex flex-col md:flex-row w-full my-5">
        <button @click="voteFood(true)" class="bg-blue-700 hover:bg-blue-800 text-white md:w-1/4 m-2 py-3 px-2 rounded inline-flex items-center">
          <i class="hate-icon icon mx-1" />まずい！
        </button>
        <button @click="voteFood(true)" class="bg-blue-600 hover:bg-blue-700 text-white md:w-1/4 m-2 py-3 px-2 rounded inline-flex items-center">
          <i class="hate-icon icon mx-1" />嫌い！
        </button>
        <button @click="voteFood(true)" class="bg-blue-500 hover:bg-blue-600 text-white md:w-1/4 m-2 py-3 px-2 rounded inline-flex items-center">
          <i class="hate-icon icon mx-1" />ニガテ！
        </button>
        <button @click="voteFood(false)" class="bg-red-500 hover:bg-red-600 text-white md:w-1/4 m-2 py-3 px-2 rounded inline-flex items-center">
          <i class="fa-icon icon mx-1" />おいしい！
        </button>
      </div>
      <p class="text-center">
        <span class="inline-block">「おいしい！」か「まずい！」に投票して</span>
        <span class="inline-block">ニガテ食材かチェックしよう！</span>
      </p>
      <!--<p class="text-center text-gray-600">※投票は1日1回まで</p>-->
    </div>
    <div v-else class="result">
      <h4 class="mt-4 py-2 px-4 text-xl bg-gray-100">結果</h4>
      <div class="flex flex-row w-full mt-4 px-4">
        <dl class="w-1/2">
          <dt class="text-xl text-blue-500">
            <span class="inline-block">まずい・</span><span class="inline-block">嫌い・</span><span class="inline-block">ニガテ派</span><span class="px-2">{{ Math.abs(hateRatio.toFixed(1)) }}％</span>
          </dt>
          <dd class="text-gray-600 text-sm">投票({{ dbData[2] }}票)</dd>
          <dd class="text-gray-600 text-sm">Google件数<br class="block md:hidden">({{ dbData[3] }}件)</dd>
        </dl>
        <dl class="w-1/2">
          <dt class="text-xl text-red-500">おいしい派<span class="px-2">{{ Math.abs(faRatio.toFixed(1)) }}％</span></dt>
          <dd class="text-gray-600 text-sm">投票({{ dbData[4] }}票)</dd>
          <dd class="text-gray-600 text-sm">Google件数<br class="block md:hidden">({{ dbData[5] }}件)</dd>
        </dl>
      </div>
      <div class="flex flex-row w-full px-4">
        <div id="hate-result" :style="hateStyle" class="bgleft w-1/5 bg-blue-500 rounded-l-lg py-2 text-center">
          <img src="/icon/star-icon.png" v-if="hateRatio > faRatio" class="star-icon" />
          <span class="align-text-top font-bold text-white">{{ Math.abs(hateRatio.toFixed(1)) }}%</span>
        </div>
        <div id="fa-result" :style="faStyle" class="bgright w-1/5 bg-red-500 rounded-r-lg py-2 text-center">
          <img src="/icon/star-icon.png" v-if="faRatio > hateRatio" class="star-icon" />
          <span class="align-text-top font-bold text-white">{{ Math.abs(faRatio.toFixed(1)) }}%</span>
        </div>
      </div>
      <div class="py-4 m-4 text-center border-4">
        <!-- ニガテ票に入れた時のコメント -->
        <div v-if="isHateVote">
          <div v-if="hateRatio > faRatio">
            <p>ニガテ票が過半数を超えました。</p>
            <p class="text-xl md:text-2xl">この食材は<span class="font-bold">ニガテ食材です！！</span></p>
            <p>胸を張っていい訳ができます。</p>
          </div>
          <div v-else>
            <p>この食材には{{ dbData[2] }}票ものニガテ票があります。</p>
            <p class="font-bold">あなたは一人ではありません。。。</p>
          </div>
        </div>
        <div v-else>
          <p>{{ dbData[0] }}をおいしいと感じるのは素晴らしいことです!<br>そのままのあなたでいてください！！</p>
          <p><span  class="font-bold">しかし好き嫌いには理由があります。</span>ニガテな人には訳を聞いてくれると嬉しいです。</p>
        </div>
      </div>
      <div class="py-2 m-4 text-center bg-gray-100">
        <p>投票結果をシェアしよう！</p>
        <share-bottons />
        <button v-if="isClickCopyUrl" class="btn-copy">
          <i class="check-icon" />コピーしました
        </button>
        <button v-else @click="copyUrl()" class="btn-copy hover:bg-gray-300">
          <i class="copy-icon" />URLをコピー
        </button>
      </div>
      <div class="container">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      fire: this.$fire.firestore.collection('foods'),
      dbData: '',
      mainImg: '',
      dbDataUpdate: '',
      dbDataNew: '',
      isClickCopyUrl: false,
      isClickvote: false,
      isHateVote: true,
      hateRatio: 0,
      faRatio: 0
    }
  },
  // 結果下の食材取得
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
    // バインドするスタイルを生成
    hateStyle () {
      return {
        '--max': this.hateRatio + '%'
      }
    },
    faStyle () {
      return {
        '--max': this.faRatio + '%'
      }
    },
    hateVote () {
      let hateVote = this.dbData[2]
      return this.isHateVote ? ++hateVote : hateVote
    },
    faVote () {
      let faVote = this.dbData[4]
      return this.isHateVote ? faVote : ++faVote
    }
  },
  created () {
    const docUsers = this.$fire.firestore.collection('foods').doc(this.$route.params.id)
    const dbData = []
    const storageRef = this.$fire.storage.ref()
    this.dbData = dbData
    const _this = this
    docUsers
      .get()
      .then(function (doc) {
        if (doc.exists) {
          dbData.push(doc.data().name)// 0:食材・料理名
          dbData.push(doc.data().tags)// 1:タグ
          dbData.push(doc.data().hate_vote)// 2:嫌い票
          dbData.push(doc.data().google_hate_vote)// 3:Google嫌い件数
          dbData.push(doc.data().fa_vote)// 4:好き票
          dbData.push(doc.data().google_fa_vote)// 5:Google好き件数
          const image = storageRef.child(doc.data().image)
          image.getDownloadURL()
            .then((url) => {
              dbData.push(url)// 6:画像パス
            })
            .catch(function () {
              dbData.push('/food/sample.png')
            })
        } else {
          _this.$router.push('/404')
        }
      })
  },
  methods: {
    voteFood (isHate) {
      this.isHateVote = isHate
      const dbData = this.dbData
      const hateVote = isHate ? 1 : 0
      // 嫌い派の計算（投票：Google検索件数=5:5）
      this.hateRatio = (
        (
          (Number(dbData[2]) + hateVote) / (Number(dbData[2]) + Number(dbData[4]) + hateVote) * 0.5
        ) + (
          (Number(dbData[3]) / (Number(dbData[3]) + Number(dbData[5]))) * 0.5
        )
      ) * 100
      this.faRatio = 100 - this.hateRatio
      this.isClickvote = true
      this.editDate(isHate)
    },
    copyUrl () {
      const element = document.createElement('input')
      element.value = location.href
      document.body.appendChild(element)
      element.select()
      document.execCommand('copy')
      document.body.removeChild(element)
      this.isClickCopyUrl = true
    },
    async editDate (isHate) {
      const fire = this.$fire.firestore.collection('foods')
      const dt = new Date()
      await fire.doc(this.$route.params.id).update({
        hate_vote: isHate ? ++this.dbData[2] : this.dbData[2],
        fa_vote: isHate ? this.dbData[4] : ++this.dbData[4],
        hate_ratio: this.hateRatio,
        update_date: dt
      }).catch((error) => {
        alert('Error writing document: ' + error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.food-tags {
  li {
    box-sizing: border-box;
    float: left;
    padding: 4px 4px 0 0;
    font-size: 1rem;
  }
  a {
    display: flex;
    position: relative;
    padding: 2px 7.5px;
    text-decoration: none;
    border-radius: 100vh;
    background: rgb(217,44,107);
    background: linear-gradient(90deg, rgba(217,44,107,1) 0%, rgba(236,110,30,1) 100%);
    box-sizing: border-box;
    overflow: hidden;
  }
  span {
    z-index: 1;
    color: #e60012;
  }
  span.bg {
    background: #fff;
    border-radius: 100vh;
    overflow: hidden;
    display: block;
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    z-index: 0;
  }
}
.result {
  h4 {
    border-left: 5px solid #000;
  }
  #fa-result {
    border-right: 2px solid #fff;
  }
}

.bgleft {
  opacity: 0;
  background-color: #3182ce;
  --max: 0%;
  animation: bgleft 1.8s cubic-bezier(1, 0.01, 0.71, 1.02) 1s 1 normal forwards;
}

.bgright {
  opacity: 0;
  background-color: #e53e3e;
  --max: 0%;
  animation: bgleft 1.8s cubic-bezier(1, 0.01, 0.71, 1.02) 1.2s 1 normal forwards;
}

@keyframes bgleft {
  0% { width: 0%;opacity: 1; }
  100% { width: var(--max);opacity: 1; }
}
@keyframes bgright {
  0% { width: 0%;opacity: 1; }
  100% { width: var(--max);opacity: 1; }
}

.btn-copy {
  display: inline-block;
  border: 4px outset #bbb;
  box-shadow: 0px 4px #bbb;
  padding: 8px 4px;
  margin-bottom: 15px;
  border-radius: 6px;
}
.btn-copy:active {
  box-shadow: none;
  position: relative;
  top: 3px;
}

// アイコン
.icon {
  width: 2rem;
  height: 2rem;
}
.fa-icon {
  background-image: url('/icon/fa-icon.svg');
}
.hate-icon {
  background-image: url('/icon/hate-icon.svg');
}
.star-icon {
  display: inline-block;
  opacity: 0;
  width: 1.5rem;
  animation: starShow 0.1s ease 2.8s 1 normal forwards;
}
@keyframes starShow {
  0% { opacity: 0; }
  100% { opacity: 1;  }
}

.check-icon {
  display: inline-block;
  width: 1.5rem;
  vertical-align: text-top;
  height: 1.1rem;
  background-image: url('/icon/check-icon.svg');
}
.copy-icon {
  display: inline-block;
  vertical-align: text-top;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 8px;
  background-image: url('/icon/copy-icon.svg');
}
</style>

<template>
  <div class="m-auto pb-4 bg-gray-200">
    <header class="sticky md:static top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-gray-200">
      <div class="flex flex-row m-auto">
        <div class="flex flex-col justify-center items-center text-left pl-6 border-b">
          <nuxt-link to="/" class="md:w-auto">
            <span class="md:text-center">
              <img src="/logo-gray.png" class="w-28 m-2">
            </span>
          </nuxt-link>
        </div>
        <div class="flex m-auto h-18 items-center px-4 sm:px-6 md:ml-10">
          <header-form></header-form>
        </div>
      </div>
    </header>
    <div class="main flex flex-col lg:flex-row justify-center mx-auto my-4 w-full lg:w-11/12 rounded-2xl bg-yellow-400">
      <div class="text">
        <p class="text-center pt-4">
          <span class="font-bold text-lg pt-4">ニガテ食材投票サイト</span>
          <img class="w-64 lg:w-80 m-auto lg:mb-4" src="logo-yellow.png">
        </p>
        <p class="m-4 lg:pt-4 text-center lg:text-left text-lg lg:text-xl text-gray-700 font-bold">
          <span class="inline-block">食べ物を美味しく頂けないのは</span><span class="inline-block">あなただけじゃないハズ</span>
          <br>どうしても食べたくない時
          <br>いい訳に使えるサイトです。
        </p>
      </div>
      <div class="img relative px-4 m-auto">
        <img class="mb-4 lg:my-4 rounded-full border-4 border-black w-80 lg:w-96" src="food/face.jpg">
        <p class="balloon absolute top-80 rounded-lg bg-red-500 font-bold text-white text-xl">マズくても<br>一人じゃない！</p>
      </div>
      <div class="my-4  md:hidden cursor-pointer">
        <nuxt-link to="/about">
          <p class="w-64 m-auto font-while text-center text-gray-500 p-2 rounded-lg">
            ご利用ガイドは<span class="underline">こちら</span>
          </p>
        </nuxt-link>
      </div>
    </div>
    <div class="bg-white pb-4">
      <section class="mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">いい訳しやすいランキング</h2>
        <!-- hate率ランキング -->
        <div class="mt-6 grid gap-y-10 gap-x-6 grid-cols-3 lg:grid-cols-4 xl:gap-x-8 mx-auto max-w-2xl lg:max-w-7xl">
          <div v-for="(data,index) in dbDataRatio" :key="index" class="group relative last:hidden lg:last:block">
            <top-food
              :index="index"
              :id="data[0]"
              :name="data[1]"
              :image="data[2]"
            />
          </div>
        </div>
      </section>
      <section class="mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">まずい・嫌い・ニガテ投票数ランキング</h2>
        <!-- 投票数率ランキング -->
        <div class="mt-6 grid gap-y-10 gap-x-6 grid-cols-3 lg:grid-cols-4 xl:gap-x-8 mx-auto max-w-2xl lg:max-w-7xl">
          <div v-for="(data,index) in dbDataVote" :key="index" class="group relative last:hidden lg:last:block">
            <top-food
              :index="index"
              :id="data[0]"
              :name="data[1]"
              :hateVote="data[2]"
              :image="data[3]"
            />
          </div>
        </div>
      </section>
      <section class="mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">新着ニガテ食材</h2>
        <!-- 新着食材 -->
        <ul class="mt-6 grid gap-y-10 gap-x-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 mx-auto max-w-2xl lg:max-w-7xl">
          <li v-for="(data,index) in dbDataNew" :key="index" class="group">
            <nuxt-link :to="{ name: 'vote-id', params: { id: data[0] } }">
              <div class="relative w-auto md:h-52 max-x-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img :src="data[2]" :alt="data[1]" class="w-full h-36 sm:h-40 md:h-52 object-center object-cover">
                <h3 class="absolute w-full bottom-0 left-0 bg-gray-800  bg-opacity-50">
                  <span class="font-bold px-4 py-2 md:py-8 opacity-100 text-white">
                    {{ data[1] }}
                  </span>
                </h3>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </section>
    </div>
    <loop-slide></loop-slide>
    <div id="second">
      <div class="float-item hidden md:block fixed float-item-fade top-10 right-4 cursor-pointer">
        <nuxt-link to="/about">
          <div class="fi-txt z-20 translate-y-32 absolute top-10 right-4">
            <p class="text-center font-bold text-sm">
              <span class="fi-text-shadow">ご利用ガイドは</span>
              <br><span class="fi-text-shadow">こちら</span>
              <br><span class="text-xs">Click</span>
            </p>
          </div>
          <div class="fi-img w-full">
            <img class="h-32 translate-y-32" src="/icon/balloon-stripe.png">
            <img class="fi-img-white h-32" src="/icon/balloon-white.png">
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fire: this.$fire.firestore.collection('foods'),
      dbDataRatio: '',
      dbDataVote: '',
      dbDataNew: '',
      imageArr: '',
      isClickCopyUrl: false,
      isClickvote: false,
      hateRatio: 0,
      faRatio: 0,
      positionX: 0, // X軸の取得
      positionY: 0, // Y軸の取得
      positions: {
        second: 0
      }
    }
  },
  async fetch () {
    const dbDataVote = []
    const dbDataNew = []
    const storageRef = this.$fire.storage.ref()
    this.dbDataVote = dbDataVote
    this.dbDataNew = dbDataNew
    // 嫌い投票順
    await this.fire.orderBy('hate_vote', 'desc').limit(4).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const array = []
          array.push(doc.id) // 0:id
          array.push(doc.data().name) // 1:食材名・料理名
          array.push(doc.data().hate_vote) // 2:嫌い票
          const image = storageRef.child(doc.data().image)
          image.getDownloadURL()
            .then((url) => {
              array.push(url) // 3:画像
            })
            .catch(function () {
              array.push('/food/sample.png') // 3:画像
            })
          dbDataVote.push(array)
        })
      })
    // 作成日時順
    await this.fire.orderBy('create_date', 'desc').limit(12).get()
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
  },
  watch: {
    positionY (to, from) {
      // + 100pxの位置に来た時点で反応させる
      const el = document.getElementById('second')
      const positionX = window.innerWidth
      if (positionX > '1024') {
        if (this.positionY > '300') {
          el.setAttribute('class', 'hidden')
        } else {
          el.removeAttribute('class', 'hidden')
        }
      } else if (positionX > '768') {
        if (this.positionY > '500') {
          el.setAttribute('class', 'hidden')
        } else {
          el.removeAttribute('class', 'hidden')
        }
      }
    }
  },
  mounted () {
    // スクロールイベントを追加
    window.addEventListener('scroll', this.checkScroll)
    this.positions = {
      // id="second"のtopのY座標を代入
      second: document.getElementById('second').getBoundingClientRect().top
    }
    // watchを反応させるために1だけ下げる
    this.positionY++
  },
  created () {
    const dbDataRatio = []
    const storageRef = this.$fire.storage.ref()
    this.dbDataRatio = dbDataRatio
    this.fire.orderBy('hate_ratio', 'desc').limit(4).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const array = []
          array.push(doc.id) // 0:id
          array.push(doc.data().name) // 1:食材名・料理名
          const image = storageRef.child(doc.data().image)
          image.getDownloadURL()
            .then((url) => {
              array.push(url) // 2:画像
            })
            .catch(function () {
              array.push('/food/sample.png') // 2:画像
            })
          dbDataRatio.push(array)
        })
      })
  },
  methods: {
    checkScroll () {
      // window.scrollYでY軸取得できる
      // IE対応のために三項演算
      this.positionY = window.scrollY ? window.scrollY : window.pageYOffset
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1200px;
}
.fi-text-shadow {
  text-shadow:1px 1px 10px orange;
}
.fi-img-white {
  --tw-translate-y: -8rem/* -128px */;
  transform: var(-8rem);
  position: relative;
  animation: spin 6s linear infinite;
}

@keyframes spin {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
}

.food-tags {
  li {
    box-sizing: border-box;
    float: left;
    padding: 4px 4px 0 0;
    font-size: 1rem;
  }
  a {
    cursor: pointer;
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
// 吹き出し
.balloon {
  padding: .5rem .8rem;
  top: 20rem;
  left: -3rem;
}
.balloon:before {
  content: "";
  position: absolute;
  top: -7px;
  right: -21px;
  margin-top: -10px;
  border: 10px solid transparent;
  border-left: 30px solid #ef4424;
  z-index: 0;
  transform: rotate(-56deg);
}
@media (max-width: 1024px) {
  .balloon {
    top: 16rem;
    left: 6rem;
  }
  .balloon::before {
    top: -19px;
    right: 58px;
    transform: rotate(-90deg);
  }
}
// ランキング
.sp {
  &__rank1 {
  }
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
.flag-icon {
  display: inline-block;
  vertical-align: text-top;
  width: 1.5rem;
  height: 1.1rem;
  background-image: url('/icon/flag-icon.svg');
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

export const state = () => ({
  user: {
    name: null,
    uid: null,
    login: false
  },
  searchFoods: [],
  imageArr: [],
  imagePath: ''
})

export const mutations = {
  setUser (state, payload) {
    state.user.name = payload.email
    state.user.uid = payload.uid
    state.user.login = true
  },
  logout (state) {
    state.user.name = null
    state.user.uid = null
    state.user.login = false
  },
  resetsearchFoods (state) {
    state.searchFoods = []
  },
  setSearchFood (state, payload) {
    state.searchFoods.push(payload.array)
  },
  setkeyword (state, payload) {
    state.keyword = payload.keyword
  },
  setImageArr (state, payload) {
    state.imageArr.push(payload.imageArr)
  }
}

export const actions = {
  login (context, payload) {
    const _this = this
    this.$fire.auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        context.commit('setUser', {
          email: userCredential.user.email,
          uid: userCredential.user.uid
        })
        _this.$router.push('/admin/manage')
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert('エラーコード' + errorCode + ',メッセージ' + errorMessage)
        this.$router.push('/admin/login')
      })
  },
  searchFood (context, payload) {
    context.commit('resetsearchFoods')
    const keyword = payload.keyword
    const fire = this.$fire.firestore.collection('foods')
    fire.where('keywords', 'array-contains', keyword).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const ary = []
          ary.push(doc.id) // 0:id
          ary.push(doc.data().name) // 1:食材名・料理名
          ary.push(doc.data().image) // 2:食材名・料理名
          context.commit('setSearchFood', {
            array: ary
          })
        })
      })
  }
}

export const getters = {
  user: (state) => {
    return state.user
  },
  searchFoods: (state) => {
    return state.searchFoods
  },
  keyword: (state) => {
    return state.keyword
  }
}

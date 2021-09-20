<template>
  <img :src="url" class="w-44 md:w-52 h-32 sm:h-40 md:h-52 object-center object-cover">
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: ''
    }
  },
  async fetch () {
    const storageRef = this.$fire.storage.ref()
    const path = await storageRef.child(this.image)
    path.getDownloadURL()
      .then((url) => {
        this.url = url
      })
      .catch(function () {
        this.url = '/food/sample.png'
      })
  }
}
</script>

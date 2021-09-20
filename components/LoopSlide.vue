<template>
  <div class="loopSlide flex flex-row py-4">
    <img :src="hateFood" alt="苦手野菜１">
    <img :src="hateFood" alt="苦手野菜２">
  </div>
</template>

<script>

export default {
  computed: {
    hateFood () {
      // キャッシュを残さない
      const now = new Date()
      return 'food/hate-foods.png?' + now
    }
  }
}
</script>

<style lang="scss" scoped>
// 画像ループ
.loopSlide{
    width: 100vw;
    height: auto;
    overflow: hidden;
    img {
      width: 100%;
      height:100%;
      &:first-child {
        animation: slide1 60s -30s linear infinite;
      }

      &:last-child {
        animation: slide2 60s linear infinite;
      }
    }
}
@keyframes slide1 {
  0% {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slide2 {
  0% {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200%);
  }
}
</style>

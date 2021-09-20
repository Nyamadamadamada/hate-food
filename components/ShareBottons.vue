<template>
  <section class="my-4">
    <div class="social-list flex flex-row justify-center">
      <div class="social-list-item mx-1">
        <a
          class="social-list-link icon-twitter w-16"
          :href="twitterUrl()"
          target="_blank"
          title="Twitterで共有"
        ><img src="/share/Twitter-icon.png"></a>
      </div>
      <div class="social-list-item mx-1">
        <a
          class="social-list-link icon-facebook w-16"
          :href="facebookUrl()"
          target="_blank"
          title="Facebookで共有"
        ><img src="/share/facebook-icon.png"></a>
      </div>
      <div class="social-list-item mx-1">
        <a
          class="social-list-link w-16"
          :href="lineUrl()"
          target="_blank"
          title="LINEで送る"
        ><img class="icon-line" src="/share/Line-icon.png"></a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShareButtons',
  data () {
    return {
      url: `https://www.suzu6.net${this.$route.path}`,
      twitter_url: 'https://twitter.com/intent/tweet?url={0}&text={1}',
      facebook_url:
        'https://www.facebook.com/sharer/sharer.php?u={0}&text={1}',
      line_url: 'https://social-plugins.line.me/lineit/share?url={0}'
    }
  },
  methods: {
    formatByArr (msg) {
      // フォーマット（引数可変（配列）版）
      let args = []
      for (let i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i]
      }
      // URLエンコード
      args = args.map(x => encodeURIComponent(x))
      return msg.replace(/\{(\d+)\}/g, function (m, k) {
        return args[k]
      })
    },
    // それぞれパラメータを埋め込む
    twitterUrl () {
      return this.formatByArr(this.twitter_url, this.url, this.title)
    },
    facebookUrl () {
      return this.formatByArr(this.facebook_url, this.url, this.title)
    },
    lineUrl () {
      return this.formatByArr(this.line_url, this.url)
    }
  }
}
</script>

<style scoped>
.social-list-link{
  text-align: center;
}
.social-list-link.icon-twitter {
  background: #fff;
  margin: 4px;
}
.icon-line {
  width: 60px;
  height: 60px;
}
.social-list-link {
  display: block;
  color: #fff;
}
a {
  color: inherit;
  text-decoration: none;
}
.content li + li {
  margin-top: 0;
}
</style>

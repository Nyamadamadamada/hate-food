<template>
  <div class="">
    <div class="container m-auto px-4 py-10">
      <h1 class="title_h1 py-2 md:py-4 text-2xl md:text-4xl text-center md:text-left font-bold relative">
        ご利用ガイド
      </h1>
      <ul class="anchor_links flex flex-col md:table md:rounded md:border md:border-gray-300 w-full">
        <li
          v-for="(link,index) in links"
          :key="index"
          class="py-2 px-2 md:px-0 text-md md:text-center md:table-cell align-middle border-b md:border-b-0 first:border-t md:first:border-t-0 md:border-r md:last:border-0 border-gray-300 hover:bg-gray-100"
        >
          <nuxt-link
            v-scroll-to="`#content${index}`"
            to
            class="block"
          >
            <span v-html="link" class="text-sm md:text-md"></span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <section id="content0" class="py-8 px-4 bg-gray-100 rounded">
      <div class="w-full">
        <h2 class="mb-4 text-center text-xl md:text-2xl font-bold tracking-tight">まずいい訳とは</h2>
        <div class="text-center">
          <p class="about-text relative text-sm md:text-base max-w-5xl m-auto mb-4">
            「まずいい訳」はニガテ食材投票サイトです。さまざまな食材がニガテで食べられない・食べたくない人向けに</p>
          <p class="text-md md:text-xl">「この食べ物がニガテな人は自分だけじゃない。」
          <br>「ニガテなままでもいいんだ!!」</p>
          <br><p class="text-sm md:text-base max-w-5xl m-auto mb-4">という<span class="emphasis_dot_open">いい訳</span>を作ることができます。</p>
        </div>
        <nuxt-link to="/">
          <p class="w-64 m-auto font-while text-center text-white bg-red-500 hover:bg-red-400 p-2 rounded-lg">
            まずいい訳へ
          </p>
        </nuxt-link>
      </div>
    </section>
    <section id="content1" class="py-8 px-4">
      <div class="w-full">
        <h2 class="mb-4 text-center text-xl md:text-2xl font-bold tracking-tight">ご利用イメージ</h2>
        <div class="max-w-screen-lg m-auto">
          <p class="ml-4 text-md">例えば、こんな時にご利用ください</p>
          <p class="ml-4 text-sm text-gray-600">&#8251;本サイトは好き嫌いを助長させるものではなく、あくまで安心感を得るためのサービスになります。</p>
          <div class="flex flex-col md:flex-row md:justify-center">
            <div class="text-center my-4">
              <img class="h-52 m-auto" src="/about/scene1.png">
              <p class="mt-4">好き嫌いを注意された時</p>
            </div>
            <div class="text-center my-4">
              <img class="h-52 m-auto" src="/about/scene2.png">
              <p class="mt-4">好き嫌いの多さに悩んでいる時</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="content2" class="py-8 px-4 bg-gray-100 rounded">
      <div class="w-full">
        <h2 class="text-center text-xl md:text-2xl font-bold tracking-tight">まずいい訳の操作説明</h2>
        <div class="about-form relative mt-14 px-4 border-2 border-yellow-500 bg-white">
          <span class="absolute inline-block px-1 py-2 rounded-t-lg bg-yellow-500 text-white">ニガテ食材の検索</span>
          <h3 class="text-xl my-2">TOPページ</h3>
          <p>TOPページには「いい訳しやすいランキング」「まずい・嫌い・ニガテ投票数ランキング」「新着ニガテ食材」が表示されています。気になるニガテ食材をクリックして投票を行ってください。それぞれの並び順は以下の通りです。</p>
          <dl class="m-4">
            <dt class="font-bold pt-2">いい訳しやすいランキング</dt>
            <dd>まずい・嫌い・ニガテ派の割合が高い順に表示しています。</dd>
            <dt class="font-bold pt-2">まずい・嫌い・ニガテ投票数ランキング</dt>
            <dd>まずい・嫌い・ニガテの投票数が多い順に表示しています。</dd>
            <dt class="font-bold pt-2">新着ニガテ食材</dt>
            <dd>最近登録されたニガテ食材の順に表示しています。新しくニガテ食材を登録して欲しい場合、お問い合わせよりご連絡ください。</dd>
          </dl>
          <h3 class="text-xl my-2">検索フォーム</h3>
          <p>
            検索フォームからもニガテ食材を検索することができます。食材名だけでなく「野菜」「むわっとした匂い」など関連するキーワードからも探すことができます。
            <img class="h-auto md:h-44 w-auto m-auto py-4" src="/about/about-form.png">
          </p>
        </div>
        <div class="about-form relative mt-14 px-4 border-2 border-yellow-500 bg-white">
          <span class="absolute inline-block px-1 py-2 rounded-t-lg bg-yellow-500 text-white">ニガテ食材の投票</span>
          <h3 class="text-xl my-2">投票ページ</h3>
          <p class="pb-4">投票ページから任意の食材がニガテ食材（ニガテな人が多い食材）かどうか投票することができます。なお「まずい！」「嫌い！」「ニガテ！」はどれを投票してもニガテ食材に１票が入ります。</p>
        </div>
      </div>
    </section>
    <section id="content3" class="py-8 px-4">
      <div class="w-full">
        <h2 class="mb-4 text-center text-xl md:text-2xl font-bold tracking-tight">投票結果の計算</h2>
        <p class="text-center max-w-5xl m-auto mb-4">
          <img class="w-full" src="/about/calculate.png">
        </p>
        <p>
          Google件数とは、その検索結果の検索にヒットしたURLの数です。Google件数は概算であり、同じ検索キーワードでも結果が異なる場合があります。
          Google件数の詳しい情報はこちらから確認できます。
        </p>
        <a class="pb-8 w-full break-words text-blue-400 md:hover:text-blue-600" href="https://support.google.com/faqs/answer/7049588?hl=en" target="blank">
          https://support.google.com/faqs/answer/7049588?hl=en
        </a>
      </div>
    </section>
    <nuxt-link to="/">
      <p class="w-64 m-auto font-while text-center text-white bg-red-500 hover:bg-red-400 my-4 p-2 rounded-lg">
        まずいい訳へ
      </p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        'まずいい訳とは',
        'ご利用イメージ',
        'まずいい訳の<br class="hidden md:inline-block">操作説明',
        '投票結果の計算'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .emphasis_dot_open {
    text-emphasis: '⚫︎';
    -webkit-text-emphasis: '⚫︎' ;
  }
  .title_h1:before {
    content: "";
    display: inline-block;
    width: 42px;
    height: 42px;
    background: url('/icon/icon_beginner.png') no-repeat;
    background-size: contain;
    top: 5px;
    position: relative;
  }
  .about-text::before {
    content: "";
    display: inline-block;
    width: 150px;
    height: 150px;
    background: url(/icon/hate-icon.png) no-repeat;
    background-size: contain;
    right: 0%;
    position: absolute;
    opacity: 0.20;
  }
  .about-form span {
    top: -42px;
    left: -2px;
  }
  @media screen and (max-width: 767px) {
    .title_h1:before {
      width: 32px;
      height: 32px;
    }
    .about-text::before {
      width: 120px;
      height: 120px;
      right: 0%;
      opacity: 0.20;
    }
  }
  .anchor_links{
    li {
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
      padding-bottom : 30px;
    }
    li:before{
      content: "";
      width: 20px;
      height: 16px;
      background: url('/icon/chevron-down.svg') no-repeat;
      background-size: contain;
      position: absolute;
      left: 50%;
      bottom: 10px;
      -webkit-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      z-index: 2;
    }
    a {
      padding-top: 0.6rem;
      padding-bottom: 2rem;
      margin-top: -0.6rem;
      margin-bottom: -2rem;
    }
    span {
      -webkit-transform: translate(0, 15%);
      -ms-transform: translate(0, 15%);
      transform: translate(0, 15%);
      line-height: 1.4;
    }
    @media screen and (max-width: 767px) {
      .anchor_links {
        a {
          padding-top: 0;
          padding-bottom: 0;
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      li {
        padding-bottom: 0;
        transform: translate(0, 0);
      }
      li:before {
        left: auto;
        right: 10px;
      }
      p {
        padding: 5px 2px;
        height: auto;
        transform: translate(0, 0%);
      }
    }
  }
</style>

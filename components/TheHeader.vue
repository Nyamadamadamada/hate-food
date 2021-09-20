<template>
  <header class="md:sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-yellow-400">
    <div class="flex flex-col md:flex-row md:m-auto">
      <div class="flex justify-between md:justify-center md:items-center text-left md:pl-6 border-b md:border-none">
        <NuxtLink to="/" class="md:w-auto">
          <img src="/logo-yellow.png" class="w-24">
        </NuxtLink>
        <span class="flex-1 pt-2 pl-2 md:hidden text-gray-600">ニガテ食材を検索して自分一人だけじゃないことを知ろう</span>
      </div>
      <div class="flex m-auto h-18 items-center pt-2 px-4 sm:px-6 md:ml-10">
        <header-form></header-form>
      </div>
    </div>
  </header>
</template>

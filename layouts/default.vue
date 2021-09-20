<template>
  <div>
    <div v-if="$route.name !== 'index'">
      <TheHeader />
    </div>
    <Nuxt />
    <TheFooter />
  </div>
</template>

<template>
  <div :class="[index == 3 ? 'hidden lg:block' : '', 'group relative']">
    <div class="w-auto md:h-56 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
      <img :src="image" :alt="name" class="w-full h-full sm:h-40 md:h-52 object-center object-cover">
    </div>
    <div class="">
      <h3 class="text-gray-700">
        <nuxt-link :to="{ name: 'vote-id', params: { id: id } }">
          <span aria-hidden="true" class="absolute inset-0"></span>
          <p class="font-bold">{{ name }}</p>
          <p v-if="update" class="hidden sm:block text-xs md:text-sm text-gray-500">
            {{ update }}
          </p>
        </nuxt-link>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: 'id'
    },
    name: {
      type: String,
      default: 'name'
    },
    image: {
      type: String,
      default: 'image'
    },
    update: {
      type: String,
      default: null
    }
  }
}
</script>

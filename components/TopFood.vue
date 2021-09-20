<template>
  <div :class="[index == 3 ? 'hidden lg:block' : '', 'group relative']">
    <div class="w-auto md:h-56 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
      <img :src="`/icon/rank_${index + 1}.svg`" class="h-8 md:h-12 m-auto">
      <img :src="image" :alt="name" class="w-full h-full sm:h-40 md:h-52 object-center object-cover">
    </div>
    <div class="mt-2 md:mt-4">
      <h3 class="text-gray-700">
        <a :href="`vote/${ id }`">
          <span aria-hidden="true" class="absolute inset-0"></span>
          {{ name }}
          <p v-if="hateVote" class="text-gray-600">
            {{ hateVote }}票
          </p>
        </a>
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
    hateVote: {
      type: Number,
      default: 0
    }
  }
}
</script>

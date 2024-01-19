<script setup lang="ts">
defineProps(["product"])
</script>

<template>
  <div
    class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-grey-200 bg-grey-100 shadow-md"
  >
    <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
      <img class="object-cover" :src="product.image" alt="product image" />
      <span
        v-if="product.discount"
        class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"
      >
        {{ product.discount }}% OFF
      </span>
    </a>
    <div class="mt-4 px-5 pb-5">
      <h5 class="text-xl tracking-tight font-bold text-white truncate">
        {{ product.title }}
      </h5>
      <div class="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span class="text-3xl font-bold text-white">
            {{ product.currency }}
            {{ product.currentPrice }}
          </span>
          <span v-if="product.discount" class="text-sm text-white line-through">
            {{ product.currency }}
            {{ product.originalPrice }}
          </span>
        </p>
      </div>
      <router-link
        :to="`/products/${product._id}`"
        class="flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-center text-base font-medium text-black hover:bg-white-800"
      >
        load more
      </router-link>
    </div>
  </div>
</template>

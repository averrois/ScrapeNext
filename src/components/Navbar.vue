<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

</script>

<template>
    <header class="md:mb-8 py-4 px-4 flex justify-between items-center select-none max-w-10xl">
      <div class="text-2xl font-semibold flex justify-between items-center">
          <RouterLink to="/" class="font-extrabold text-3xl">
            Logo
          </RouterLink>
      </div>

      <div class="text-gray-800 sm:block md:hidden">
        <div @click="isOpen =! isOpen" v-show="!isOpen">
          <svg class="fill-current w-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </div>

        <div @click="isOpen =! isOpen" v-show="isOpen">
          <svg class="fill-current w-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </div>
      </div>

      <!-- Desktop Links -->
      <div class="hidden md:block text-sm">
        <RouterLink  to="/" class="py-2 px-3 ml-2 hover:bg-indigo-100 rounded">
          Home
        </RouterLink>

        <RouterLink  to="/about" class="py-2 px-3 ml-2 hover:bg-indigo-100 rounded">
          About Us
        </RouterLink>
      </div>
    </header>

    <!-- Mobile Links -->
    <div class="bg-white px-4 py-4 select-none border-b md:hidden" v-if="isOpen">
      <RouterLink  to="/" class="block mb-2 font-semibold text-gray-800 py-2 px-3 hover:bg-gray-200 rounded cursor-pointer">
        Home
      </RouterLink>

      <RouterLink  to="/about" class="block mb-2 font-semibold text-gray-800 py-2 px-3 hover:bg-gray-200 rounded cursor-pointer">
        About Us
      </RouterLink>
    </div>
</template>

<style scoped>
.logo{
    font-size: 25px;
    font-weight: bold;
}

a {
    font-size: 18px;
}
</style>

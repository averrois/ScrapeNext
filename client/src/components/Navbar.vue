<script setup lang="ts">
import { ref } from "vue"
import NavbarLink from "./NavbarLink.vue"
import { RouterLink } from "vue-router"

const isOpen = ref(false)
</script>

<template>
  <header class="md:mb-8 py-4 px-4 flex justify-between items-center select-none max-w-10xl text-white-800">
    <div class="text-2xl font-semibold flex justify-between items-center">
      <RouterLink to="/" class="logo"> ScrapeNext </RouterLink>
    </div>

    <div class="text-gray-800 sm:block md:hidden">
      <div @click="isOpen = !isOpen" v-show="!isOpen">
        <svg class="fill-white-800 w-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </div>

      <div @click="isOpen = !isOpen" v-show="isOpen">
        <svg class="fill-white-800 w-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      </div>
    </div>

    <!-- Desktop Links -->
    <div class="hidden justify-center items-center md:block text-sm">
      <NavbarLink href="/" link="Home" />
      <NavbarLink href="/products" link="Products" />
    </div>
  </header>

  <!-- Mobile Links -->
  <div class="bg-grey-100 px-4 py-4 select-none md:hidden" v-if="isOpen">
    <NavbarLink href="/" link="Home" />
    <NavbarLink href="/products" link="Products" />
  </div>
</template>

<style scoped>
.logo {
  font-size: 30px;
  font-weight: bold;
  color: white;
}

a {
  font-size: 17px;
}
</style>

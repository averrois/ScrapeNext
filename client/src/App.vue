<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarVue from './components/Navbar.vue'
</script>

<template>
  <main class="max-w-[1440px] h-[100vh] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black-100 via-gray-900 to-black">
    <NavbarVue />
    <RouterView />
  </main>
</template>


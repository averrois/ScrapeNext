<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarVue from './components/Navbar.vue'
</script>

<template>
  <main class="max-w-[1440px] min-h-[100vh]">
    <NavbarVue />
    <RouterView />
  </main>
</template>


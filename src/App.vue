<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarVue from './components/Navbar.vue'
</script>

<template>
  <main class="max-w-10xl mx-auto bg-black-100">
    <NavbarVue />
    <RouterView />
  </main>
</template>


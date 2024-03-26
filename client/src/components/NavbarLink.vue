<script setup lang="ts">
import { RouterLink } from "vue-router"

defineProps({
  href: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <RouterLink :to="href" class="py-2 px-3 ml-2 text-white hover:text-white-500">
    {{ link }}
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'


</script>

<template>
    <header class="w-full">
        <nav class="p-6 flex justify-between items-center">
            <div class="mr-6 logo">
                <RouterLink to="/" class="cursor-pointer font-bold text-4xl">Logo</RouterLink>
            </div>
            <div class="w-48">
                <ul class="flex justify-between items-center">
                    <li>
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about">About</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style scoped>
li {
    font-size: 20px;
}
</style>

<script setup lang="ts">
import Searchbar from "./Searchbar.vue";
</script>

<template>
  <section class="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
    <div class="container px-4 md:px-6">
      <div class="grid gap-6 items-center">
        <div class="flex flex-col justify-center space-y-4 text-center">
          <div class="space-y-2">
            <h1
              class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
            >
              Unleash the Scraping Magic for Your Products with ScrapeNext
            </h1>
            <p
              class="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto"
            >
              Your go-to solution for effortlessly collecting and managing data
              from the web. Explore the endless possibilities with ScrapeNest -
              Simplifying Web Scraping for You.
            </p>
          </div>
          <Searchbar />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  line-height: 4rem;
}
</style>

<script setup lang="ts">
import Searchbar from "./Searchbar.vue";
</script>

<template>
  <!-- <div class="px-4 md:block">
    <div class="pb-8 mt-auto max-md:pc-4">
      <div
        class="text-center max-w-4xl flex flex-col justify-center items-center m-auto"
      >
        <h1
          class="text-5xl md:text-7xl mb-8 mt-16 font-extrabold max-w-4xl mx-auto text-white-800"
        >
          Unleash the Scraping Magic for Your Products with
          <span class="text-primary font-normal">ScrapeNext</span>
        </h1>
        <div class="md:max-w-4xl mx-auto">
          <p class="text-white-500 text-2xl max-md:text-xl font-regular">
            Your go-to solution for effortlessly collecting and managing data
            from the web. Explore the endless possibilities with ScrapeNest -
            Simplifying Web Scraping for You.
          </p>
        </div>

        <div class="mb-6 mt-12 w-full">
          <Searchbar />
        </div>
      </div>
    </div>
  </div> -->
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
          <div class="w-full max-w-xl space-y-2 mx-auto">
            <form class="flex space-x-2">
              <input
                type="email"
                class="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 bg-gray-800 text-white border-gray-900"
                placeholder="Enter your email"
              />
              <button
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-800/90 hover:text-white h-10 px-4 py-2 bg-white text-black"
                type="submit"
              >
                Join Now
              </button>
            </form>
            <p class="text-xs text-zinc-200 dark:text-zinc-100">
              Get ready to redefine your email experience.
              <a
                class="underline underline-offset-2 text-white"
                href="#"
                rel="ugc"
              >
                Terms &amp; Conditions
              </a>
            </p>
          </div>
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

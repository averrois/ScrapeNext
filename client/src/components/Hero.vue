<script setup lang="ts">
import Searchbar from './Searchbar.vue';


</script>

<template>
    <div class="px-4 md:block">
        <div class="pb-8 mt-auto max-md:pc-4">
            <div class="text-center max-w-4xl flex flex-col justify-center items-center m-auto">
                <h1 class="text-5xl md:text-7xl mb-8 mt-16 font-extrabold max-w-4xl mx-auto text-white-800">
                    Unleash the Scraping Magic for Your Products with
                    <span class="text-primary font-normal">ScrapeNext</span>
                </h1>
                <div class="md:max-w-4xl mx-auto">
                    <p class="text-white-500 text-2xl max-md:text-xl font-regular">
                        Your go-to solution for effortlessly collecting and managing data from the web. Explore the endless
                        possibilities with ScrapeNest - Simplifying Web Scraping for You.
                    </p>
                </div>

                <div class="mb-6 mt-12 w-full">
                    <Searchbar />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    line-height: 4rem;
}
</style>

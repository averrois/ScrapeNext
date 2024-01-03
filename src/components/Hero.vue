<script setup lang="ts">

</script>

<template>
    <div class="px-4 md:block">
        <div class="pb-8 mt-auto">
            <div class="text-center max-w-4xl flex flex-col justify-center items-center m-auto">
                <h1 class="text-4xl md:text-7xl mb-8 mt-16 font-serif font-light max-w-4xl mx-auto text-white-800">
                    The Progressive Empower Your Projects with
                    <span class="text-primary font-normal">ScrapeNext</span>
                </h1>

                <div class="md:max-w-4xl mx-auto">
                    <p class="text-white-500 md:text-lg">
                        Your go-to solution for effortlessly collecting and managing data from the web. Explore the endless
                        possibilities with ScrapeNest - Simplifying Web Scraping for You.
                    </p>
                </div>

                <div class="mb-6 mt-12 w-full">

                    <form>
                        <label for="default-search"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="paste url here..." required>
                            <button type="submit"
                                class="text-white absolute end-2.5 bottom-2.5 bg-primary focus:outline-none font-medium rounded text-sm px-6 py-2">Search</button>
                        </div>
                    </form>

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

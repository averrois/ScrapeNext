<script setup lang="ts">
import { ref } from 'vue'
import { scrapeAndStoreProduct } from '@/lib/actions'
import axios from 'axios';

const searchPrompt = ref('')
const isLoading = ref(false)

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url)
        const hostname = parsedURL.hostname

        if (
            hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon')
        ) {
            return true
        }
    } catch (error) {
        return false
    }

    return false
}

const handleSubmit = async (e: Event) => {
    e.preventDefault()
    // console.log(searchPrompt.value)

    const isValidLink = isValidAmazonProductURL(searchPrompt.value)

    if (!isValidLink) return alert('Please provide a valid Amazon link')

    try {
        isLoading.value = true

        // Scrape the product page
        const product = await scrapeAndStoreProduct(searchPrompt.value)

        const response = await axios.get('http://localhost:3000/api', {
            params: { url: `${searchPrompt.value}` },
        })

        console.log(response.data._id)

        searchPrompt.value = ''
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false
    }
}



const handleSearchValue = (e: Event) => {
    searchPrompt.value = (e.target as HTMLInputElement).value
}


</script>

<template>
    <form @submit="handleSubmit">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input type="text"
                class="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="paste url here..." required v-model="searchPrompt" @input="handleSearchValue" />
            <button type="submit" :disabled="isLoading"
                class="text-white absolute end-2.5 bottom-2.5 bg-primary focus:outline-none rounded text-lg font-bold px-6 py-2"
                :class="{ 'bg-black-300': isLoading }">
                {{ isLoading ? 'Searching...' : 'Search' }}
            </button>
        </div>
    </form>
</template>

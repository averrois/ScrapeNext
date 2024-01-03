<script setup lang="ts">
import { ref } from 'vue'

const searchPrompt = ref('')


const handleSubmit = (e: Event) => {
    e.preventDefault()
    console.log(searchPrompt.value)
}


const handleSearchValue = (e: Event) => {
    searchPrompt.value = (e.target as HTMLInputElement).value;
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
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="paste url here..." 
                required 
                v-model="searchPrompt" 
                @input="handleSearchValue" />
            <button 
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-primary focus:outline-none font-medium rounded text-sm px-6 py-2"
            >
                Search
            </button>
        </div>
    </form>
</template>
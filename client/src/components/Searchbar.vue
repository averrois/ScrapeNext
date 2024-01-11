<script setup lang="ts">
import { ref } from 'vue'
import { scrapeAndStoreProduct } from '@/lib/actions'
import { useRouter } from 'vue-router'
import axios from 'axios'

const searchPrompt = ref('')
const isLoading = ref(false)
const router = useRouter()

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
        // const product = await scrapeAndStoreProduct(searchPrompt.value)

        const response = await axios.get('http://localhost:3000/api', {
            params: { url: `${searchPrompt.value}` },
        })

        // console.log(response.data)
        const productId = await response.data._id

        // Redirect to the product page
        router.push(`/products/${productId}`)

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
    <div class="absolute w-full h-full z-20 left-0 top-0 flex justify-center items-center">
        <div class="loader z-10">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
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

<style scoped>
.load_container {
    backdrop-filter: blur(10px);
}

.loader::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.562);
    /* Adjust the darkness level here */
    z-index: 1;
}

.loader {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8px;
}

.loader div {
    width: 60px;
    height: 60px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #66cdaa;
    border-radius: 50%;
}

.loader div:before,
.loader div:after {
    content: '';
    width: 60px;
    height: 60px;
    position: absolute;
    border-radius: 50%;
}

.loader div:before {
    background-color: #ffdab9;
    animation: scale-1 2400ms linear infinite;
}

.loader div:after {
    background-color: #66cdaa;
    animation: scale-2 2400ms linear infinite;
}

.loader div:nth-child(2):before,
.loader div:nth-child(2):after {
    animation-delay: 300ms;
}

.loader div:nth-child(3):before,
.loader div:nth-child(3):after {
    animation-delay: 600ms;
}

.loader div:nth-child(4):before,
.loader div:nth-child(4):after {
    animation-delay: 900ms;
}

.loader div:nth-child(5):before,
.loader div:nth-child(5):after {
    animation-delay: 1200ms;
}

.loader div:nth-child(6):before,
.loader div:nth-child(6):after {
    animation-delay: 1500ms;
}

.loader div:nth-child(7):before,
.loader div:nth-child(7):after {
    animation-delay: 1800ms;
}

.loader div:nth-child(8):before,
.loader div:nth-child(8):after {
    animation-delay: 2100ms;
}

.loader div:nth-child(9):before,
.loader div:nth-child(9):after {
    animation-delay: 2400ms;
}

@-moz-keyframes scale-1 {
    0% {
        transform: scale(0);
        z-index: 2;
    }

    50%,
    100% {
        transform: scale(1);
    }
}

@-webkit-keyframes scale-1 {
    0% {
        transform: scale(0);
        z-index: 2;
    }

    50%,
    100% {
        transform: scale(1);
    }
}

@-o-keyframes scale-1 {
    0% {
        transform: scale(0);
        z-index: 2;
    }

    50%,
    100% {
        transform: scale(1);
    }
}

@keyframes scale-1 {
    0% {
        transform: scale(0);
        z-index: 2;
    }

    50%,
    100% {
        transform: scale(1);
    }
}

@-moz-keyframes scale-2 {

    0%,
    50% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@-webkit-keyframes scale-2 {

    0%,
    50% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@-o-keyframes scale-2 {

    0%,
    50% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes scale-2 {

    0%,
    50% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}</style>

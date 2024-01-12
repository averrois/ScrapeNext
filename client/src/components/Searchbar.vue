<script setup lang="ts">
import { ref } from 'vue'
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

    const isValidLink = isValidAmazonProductURL(searchPrompt.value)

    if (!isValidLink) return alert('Please provide a valid Amazon link')

    try {
        isLoading.value = true

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
    <div v-if="isLoading" class="absolute w-full h-full z-20 left-0 top-0 flex justify-center items-center cursor-wait">
        <div class="blur_bg"></div>
        <div class="content z-10">
            <div class="loading flex justify-center items-center">
                <p class="text-2xl mb-6 font-medium uppercase">loading</p>
                <span></span>
            </div>
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

.blur_bg {
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
    backdrop-filter: blur(5px);
}

.content {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content .loading {
    width: 80px;
    height: 50px;
    position: relative;
}

.content .loading p {
    top: 0;
    color: #2190FF;
    font-family: "Oxygen", sans-serif;
    animation: text 3.5s ease both infinite;
    /* font-size: 12px; */
    letter-spacing: 1px;
}

@keyframes text {
    0% {
        letter-spacing: 1px;
        transform: translateX(0px);
    }

    40% {
        letter-spacing: 2px;
        transform: translateX(26px);
    }

    80% {
        letter-spacing: 1px;
        transform: translateX(32px);
    }

    90% {
        letter-spacing: 2px;
        transform: translateX(0px);
    }

    100% {
        letter-spacing: 1px;
        transform: translateX(0px);
    }
}

.content .loading span {
    background-color: #2190FF;
    border-radius: 50px;
    display: block;
    height: 16px;
    width: 16px;
    bottom: 0;
    position: absolute;
    transform: translateX(64px);
    animation: loading 3.5s ease both infinite;
}

.content .loading span:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #101E42;
    border-radius: inherit;
    animation: loading2 3.5s ease both infinite;
}

@keyframes loading {
    0% {
        width: 16px;
        transform: translateX(0px);
    }

    40% {
        width: 100%;
        transform: translateX(0px);
    }

    80% {
        width: 16px;
        transform: translateX(64px);
    }

    90% {
        width: 100%;
        transform: translateX(0px);
    }

    100% {
        width: 16px;
        transform: translateX(0px);
    }
}

@keyframes loading2 {
    0% {
        transform: translateX(0px);
        width: 16px;
    }

    40% {
        transform: translateX(0%);
        width: 80%;
    }

    80% {
        width: 100%;
        transform: translateX(0px);
    }

    90% {
        width: 80%;
        transform: translateX(15px);
    }

    100% {
        transform: translateX(0px);
        width: 16px;
    }
}
</style>

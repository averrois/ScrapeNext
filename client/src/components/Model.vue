<script setup lang="ts">
import { ref } from 'vue';

const isClose = ref(false)

const handleClose = () => {
    isClose.value = true
}

</script>

<template>
    <div :class="{'hidden': isClose}" class="absolute w-full h-full z-20 left-0 top-0 flex justify-center items-center">
        <div class="blur_bg"></div>
        <div class="fixed inset-0 flex items-center justify-center z-50 m-6" :class="{ 'hidden': isClose }">
            <div class="bg-black-200 border-black-300 border-2 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                <div class="flex justify-between items-center">
                    <h2 class="text-white text-2xl font-bold">Track This Product!</h2>
                    <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="h-5 w-5">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mt-4">Enter your email to keep tracking this product.</p>
                <form class="mt-6 space-y-4">
                    <div class="space-y-2">
                        <label
                            class="text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="email">
                            Email
                        </label>
                        <input
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email" placeholder="m@example.com" required type="email" />
                    </div>
                    <button
                        class="text-white font-bold text-base inline-flex items-center justify-center rounded-md  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        type="submit">
                        Track
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
</style>


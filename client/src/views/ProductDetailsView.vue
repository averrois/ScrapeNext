<script setup lang="ts">
import PriceInfoCard from '@/components/PriceInfoCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Model from '@/components/Model.vue'

const product = ref<any | null>(null)
const isActive = ref(false)

const fetchProductDetails = async () => {
    try {
        // Extract the product ID from the URL
        const productId = window.location.pathname.split('/').pop()
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`)
        product.value = await response.data
    } catch (error: any) {
        console.error(error)
        // Handle error...
    }
}

const handleClick = () => {
    isActive.value = true
}

onMounted(fetchProductDetails)


</script>

<template>
    <Model :isClose="isActive" />
    <!-- <div v-if="isActive" class="absolute w-full h-full z-20 left-0 top-0 flex justify-center items-center">
        <div class="blur_bg"></div>
        <div class="fixed inset-0 flex items-center justify-center z-50 m-6" :class="{'hidden': isClose}">
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
    </div> -->
    <section class="container mx-auto px-4 md:px-6 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
                <img alt="Product Image" class="rounded-lg object-cover w-full aspect-square mb-4 md:mb-0"
                    :src="product?.image" />
                <!-- Mini other images  -->
                <!-- <div class="grid grid-cols-4 gap-2 mt-4">
                    <img alt="Product Thumbnail"
                        class="rounded-lg object-cover w-full aspect-square" 
                        height="200" 
                        src="" 
                        width="200"
                    />
                </div> -->
            </div>
            <div>
                <h1 class="text-3xl font-bold text-white mb-4">{{ product?.title }}</h1>
                <a :href="product?.url" class="text-lg w-fit font-medium block mb-4 text-white-800" target="_blank">Visit
                    Product</a>
                <div class="flex flex-wrap gap-5 mb-4">
                    <PriceInfoCard title="Current Price" :price="product?.currentPrice" :currency="product?.currency" />
                    <PriceInfoCard v-if="product?.discountRate" title="Original Price" :price="product?.originalPrice"
                        :currency="product?.currency" />
                    <PriceInfoCard v-if="product?.lowestPrice" title="Lowest Price" :price="product?.lowestPrice"
                        :currency="product?.currency" />
                    <PriceInfoCard v-if="product?.highestPrice" title="Highest Price" :price="product?.highestPrice"
                        :currency="product?.currency" />
                    <PriceInfoCard v-if="product?.averagePrice" title="Average  Price" :price="product?.averagePrice"
                        :currency="product?.currency" />
                </div>
                <button
                    class="bg-primary hover:bg-blue-500 text-white  text-xl font-medium w-full py-2.5 px-4 rounded-full" 
                    @click="handleClick"
                    >
                    Track
                </button>
            </div>
        </div>
    </section>
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

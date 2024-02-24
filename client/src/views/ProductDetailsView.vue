<script setup lang="ts">
import PriceInfoCard from '@/components/PriceInfoCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Model from '@/components/Model.vue'
// const baseURL = import.meta.env.VITE_BASE_URL

const product = ref<any | null>(null)
const isActive = ref(true)

const fetchProductDetails = async () => {
    try {
        // Extract the product ID from the URL
        const productId = window.location.pathname.split('/').pop()
        const response = await axios.get(`/api/products/${productId}`)
        product.value = await response.data
    } catch (error: any) {
        console.error(error)
        // Handle error...
    }
}

const handleClick = () => {
    isActive.value = !isActive.value
}
onMounted(fetchProductDetails)

</script>

<template>
    <Model :isClose="isActive" @close="handleClick"/>
    <section class="container mx-auto px-4 md:px-6 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div class="flex justify-center items-center w-full h-full border-grey-200 bg-grey-100 border-2 p-6 rounded">
                <img alt="Product Image" class="rounded object-cover w-full  max-w-md"
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
                <button class="bg-white hover:bg-white-800 text-black  text-xl font-medium w-full py-2.5 px-4 rounded-full"
                    @click="handleClick">
                    Track
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import PriceInfoCard from '@/components/PriceInfoCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import type { Product } from '../../../server/lib/types'

// const product = ref(null)
const product = ref<any | null>(null)

const fetchProductDetails = async () => {
    try {
        // Extract the product ID from the URL
        const productId = window.location.pathname.split('/').pop()
        console.log(productId)
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`)
        product.value = await response.data
    } catch (error: any) {
        console.error(error);
        // Handle error...
    }
}

onMounted(fetchProductDetails)


</script>

<template>
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
                <button class="bg-primary hover:bg-blue-500 text-white  text-xl font-medium w-full py-2.5 px-4 rounded-full">
                    Track
                </button>
            </div>
        </div>
    </section>
</template>

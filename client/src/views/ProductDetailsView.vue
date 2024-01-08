<script setup lang="ts">
import PriceInfoCard from '@/components/PriceInfoCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

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
        <div class="grid lg:grid-cols-2 gap-6 items-start">
            <div>
                <img alt="Product Image" class="rounded-lg object-cover w-full aspect-square" height="600"
                    :src="product?.image" width="600" />
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
                <h1 class="text-3xl font-bold text-white">{{ product?.title }}</h1>
                <div className="my-7 flex flex-col gap-5">
                    <div className="flex gap-5 flex-wrap">
                        <PriceInfoCard title="Current Price" :price="product?.currentPrice" :currency="product?.currency" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

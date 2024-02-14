<script setup lang="ts">
import Card from '@/components/Card.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
const baseURL = import.meta.env.VITE_BASE_URL

const products = ref<any | null>(null)

const fetchProducts = async () => {
    try {
        const response = await axios.get(`${baseURL}/api/products`)
        products.value = response.data
    } catch (error: any) {
        console.log(error)
        // Handle error...
    }
}

onMounted(fetchProducts)


</script>

<template>
    <div class="md:max-w[1000px] md:p-2 flex flex-wrap justify-around items-center m-auto">
        <Card v-for="product in products" :key="product._id" :product="product" />
    </div>
</template>

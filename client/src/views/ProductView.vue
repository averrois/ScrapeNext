<script setup lang="ts">
import Card from '@/components/Card.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const products = ref(null)

// const fetchProducts = async () => {
//     try {
//         const response = await axios.get('http://localhost:3000/api/products')
//         products.value = response.data
//         console.log(products.value)
//     } catch (error: any) {
//         console.log(error)
//         error.value = 'Error fetching products'
//     }
// }

// onMounted(fetchProducts)


</script>

<template>
    <div class="md:max-w[1000px] md:p-2 flex flex-wrap justify-around items-center m-auto">
        <Card />
        <ul v-if="products">
            <li>Nice</li>
        </ul>
        <p v-else>Loading products...</p>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
const baseURL = import.meta.env.VITE_BASE_URL;

const isLoading = ref(false);
const products = ref<any | null>(null);

const fetchProducts = async () => {
  try {
    isLoading.value = true;

    const response = await axios.get(`${baseURL}/api/products`);
    products.value = response.data;
  } catch (error: any) {
    console.log(error);
    // Handle error...
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div
    v-if="isLoading"
    class="absolute w-full h-full z-20 left-0 top-0 flex justify-center items-center cursor-wait"
  >
    <div class="blur_bg"></div>
    <div class="content z-10">
      <div class="loading flex justify-center items-center">
        <p class="text-2xl mb-6 font-medium uppercase">loading</p>
        <span></span>
      </div>
    </div>
  </div>
  <div
    class="md:max-w[1000px] md:p-2 flex flex-wrap justify-around items-center m-auto"
  >
    <Card v-for="product in products" :key="product._id" :product="product" />
  </div>
</template>

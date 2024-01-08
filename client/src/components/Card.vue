<script setup lang="ts">
defineProps(['product'])

const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
}
</script>

<template>
    <div
        class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img class="object-cover" :src="product.image" alt="product image" />
            <span v-if="product.discount"
                class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                {{ product.discount }}% OFF
            </span>
        </a>
        <div class="mt-4 px-5 pb-5">
            <a href="#">
                <h5 class="text-xl tracking-tight font-bold text-slate-900">{{ truncateTitle(product.title, 30) }}</h5>
            </a>
            <div class="mt-2 mb-5 flex items-center justify-between">
                <p>
                    <span class="text-3xl font-bold text-slate-900">
                        {{ product.currency }}
                        {{ product.currentPrice }}
                    </span>
                    <span v-if="product.discount" class="text-sm text-slate-900 line-through">
                        {{ product.currency }}
                        {{ product.originalPrice }}
                    </span>
                </p>
            </div>
            <a href="#"
                class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Add to cart
            </a>
        </div>
    </div>
</template>

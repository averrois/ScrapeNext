<script setup lang="ts">
import PriceInfoCardVue from '@/components/PriceInfoCard.vue';

</script>

<template>
    <section class="container mx-auto px-4 md:px-6 py-8">
        <div class="grid lg:grid-cols-2 gap-6 items-start">
            <div>
                <img alt="Product Image" class="rounded-lg object-cover w-full aspect-square" height="600" src=""
                    width="600" />
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
                <h1 class="text-3xl font-bold">Product Name</h1>
                <p class="mt-2 text-zinc-500 dark:text-zinc-400">This is a brief description of the product. It highlights
                    its features and unique selling points.</p>
                <h2 class="text-4xl font-bold mt-6">$99.99</h2>
                <div class="mt-8">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label><button
                        aria-autocomplete="none" aria-controls="radix-:R5drnnnla:" aria-expanded="false"
                        class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        data-placeholder="" data-state="closed" dir="ltr" role="combobox" type="button"><span
                            style="pointer-events:none">Select a color</span><svg aria-hidden="true"
                            class="h-4 w-4 opacity-50" height="24" viewbox="0 0 24 24" width="24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg></button>
                </div>
                <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label><input
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        max="100" min="1" type="number">
                </div>
                <div className="my-7 flex flex-col gap-5">
                    <div className="flex gap-5 flex-wrap">
                        <PriceInfoCardVue />
                        <PriceInfoCardVue />
                        <PriceInfoCardVue />
                        <PriceInfoCardVue />
                    </div>
                </div>
                        <button
                            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-8">Add
                            to Cart
                        </button>
                    </div>
                </div>
    </section>
</template>

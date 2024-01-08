<script setup lang="ts">
import PriceInfoCard from '@/components/PriceInfoCard.vue';

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
                <div className="my-7 flex flex-col gap-5">
                    <div className="flex gap-5 flex-wrap">
                        <PriceInfoCard title="Current Price" :price="50" currency="$" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

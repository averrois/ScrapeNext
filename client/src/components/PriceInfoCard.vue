<script setup lang="ts">

defineProps({
  title: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: '',
  },
})

</script>

<template>
    <div class="flex-1 min-w-[200px] flex flex-col gap-2 border-black-300 border-[3px] rounded-md  px-5 py-4">
        <p class="text-xl text-white">{{ title }}</p>

        <div class="flex gap-1">
            <img src="../assets/icons/price-tag.svg" alt="test" width="24" height="24" />

            <p class="text-2xl font-bold text-white">{{ currency }} {{ price }}</p>
        </div>
    </div>
</template>

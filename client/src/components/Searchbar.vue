<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

const searchPrompt = ref("")
const isLoading = ref(false)
const router = useRouter()

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname

    if (hostname.includes("amazon.com") || hostname.includes("amazon.") || hostname.endsWith("amazon")) {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const isValidLink = isValidAmazonProductURL(searchPrompt.value)

  if (!isValidLink) return alert("Please provide a valid Amazon link")

  try {
    isLoading.value = true

    const response = await axios.get(`${baseURL}/api`, {
      params: { url: `${searchPrompt.value}` },
    })

    // check response status
    if (response.status === 500) {
      router.push("/crash")
    }

    // console.log(response.data)
    const productId = await response.data._id

    // Redirect to the product page
    router.push(`/products/${productId}`)

    searchPrompt.value = ""
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="isLoading" class="absolute w-full h-full z-20 left-0 top-0 flex justify-center items-center cursor-wait">
    <div class="blur_bg"></div>
    <div class="content z-10">
      <div class="spinner"></div>
    </div>
  </div>
  <div class="w-full max-w-xl space-y-2 mx-auto">
    <form class="flex space-x-2" @submit="handleSubmit" name="search">
      <input
        type="text"
        class="flex h-14 w-full rounded-md border px-6 truncate py-2 text-lg ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 bg-grey-100 text-white border-grey-200"
        placeholder="paste url here..."
        required
        name="search-input"
        v-model="searchPrompt"
        autocomplete="off"
      />
      <button
        :disabled="isLoading"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colorsdisabled:pointer-events-none disabled:opacity-50 hover:bg-white-800 h-14 px-6 py-2 bg-white text-black"
        type="submit"
        :class="{ 'bg-black-300': isLoading }"
      >
        {{ isLoading ? "Searching..." : "Search" }}
      </button>
    </form>
  </div>
</template>

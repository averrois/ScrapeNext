<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const searchPrompt = ref("");
const isLoading = ref(false);
const router = useRouter();

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  const isValidLink = isValidAmazonProductURL(searchPrompt.value);

  if (!isValidLink) return alert("Please provide a valid Amazon link");

  try {
    isLoading.value = true;

    const response = await axios.get("/api", {
      params: { url: `${searchPrompt.value}` },
    });

    // console.log(response.data)
    const productId = await response.data._id;

    // Redirect to the product page
    router.push(`/products/${productId}`);

    searchPrompt.value = "";
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

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
  <div class="w-full max-w-xl space-y-2 mx-auto">
    <form class="flex space-x-2" @submit="handleSubmit">
      <input
        type="text"
        class="flex h-10 w-full rounded-md border px-3 py-2 text-medium ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 bg-gray-800 text-white border-gray-900"
        placeholder="paste url here..."
        required
        v-model="searchPrompt"
      />
      <button
        :disabled="isLoading"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-medium font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-800/90 hover:text-white h-10 px-4 py-2 bg-white text-black"
        type="submit"
        :class="{ 'bg-black-300': isLoading }"
      >
        {{ isLoading ? "Searching..." : "Search" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.load_container {
  backdrop-filter: blur(10px);
}

.blur_bg {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.562);
  /* Adjust the darkness level here */
  z-index: 1;
  backdrop-filter: blur(5px);
}

.content {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content .loading {
  width: 80px;
  height: 50px;
  position: relative;
}

.content .loading p {
  top: 0;
  color: #2190ff;
  font-family: "Oxygen", sans-serif;
  animation: text 3.5s ease both infinite;
  /* font-size: 12px; */
  letter-spacing: 1px;
}

@keyframes text {
  0% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }

  40% {
    letter-spacing: 2px;
    transform: translateX(26px);
  }

  80% {
    letter-spacing: 1px;
    transform: translateX(32px);
  }

  90% {
    letter-spacing: 2px;
    transform: translateX(0px);
  }

  100% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }
}

.content .loading span {
  background-color: #2190ff;
  border-radius: 50px;
  display: block;
  height: 16px;
  width: 16px;
  bottom: 0;
  position: absolute;
  transform: translateX(64px);
  animation: loading 3.5s ease both infinite;
}

.content .loading span:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #101e42;
  border-radius: inherit;
  animation: loading2 3.5s ease both infinite;
}

@keyframes loading {
  0% {
    width: 16px;
    transform: translateX(0px);
  }

  40% {
    width: 100%;
    transform: translateX(0px);
  }

  80% {
    width: 16px;
    transform: translateX(64px);
  }

  90% {
    width: 100%;
    transform: translateX(0px);
  }

  100% {
    width: 16px;
    transform: translateX(0px);
  }
}

@keyframes loading2 {
  0% {
    transform: translateX(0px);
    width: 16px;
  }

  40% {
    transform: translateX(0%);
    width: 80%;
  }

  80% {
    width: 100%;
    transform: translateX(0px);
  }

  90% {
    width: 80%;
    transform: translateX(15px);
  }

  100% {
    transform: translateX(0px);
    width: 16px;
  }
}
</style>

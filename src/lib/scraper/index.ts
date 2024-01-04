import axios from "axios"

export async function scraperAmazonProduct(url: string) {
  if (!url) return

  const backendUrl = "http://localhost:3000/api"

  try {
    const response = await axios.get(backendUrl, {
      params: { url }, // Send the original URL as a parameter to backend
    })

    // Handle the response as needed
    console.log(response.data)
  } catch (error: any) {
    console.error('Failed to fetch:', error.message)
    // Handle the error appropriately
  }
}

import axios from "axios"
import  cheerio  from "cheerio"

export async function scraperAmazonProduct(url: string) {
  if (!url) return

  const backendUrl = "http://localhost:3000/api"

  try {
    const response = await axios.get(backendUrl, {
      params: { url }, // Send the original URL as a parameter to backend
    })

    // Handle the response as needed
    // console.log(response.data)
    // Initialize Cheerio
    const $ = cheerio.load(response.data)

    // Extract product title
    const title = $('#productTitle').text().trim()

    console.log(title)

  } catch (error: any) {
    console.error('Failed to fetch:', error.message)
    // Handle the error appropriately
  }
}

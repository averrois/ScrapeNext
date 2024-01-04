import axios from "axios"
import * as cheerio from "cheerio"
import { extractPrice } from "../utils"

export async function scraperAmazonProduct(url: string) {
    if (!url) return

    const backendUrl = "http://localhost:3000/api"

    try {
        const response = await axios.get(backendUrl, {
            params: { url }, // Send the original URL as a parameter to backend
        })
        
        // Handle the response as needed
        
        // Initialize Cheerio
        const $ = cheerio.load(response.data)

        // Extract product title
        const title = $('#productTitle').text().trim()
        // Extract product price
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        )

        console.log( currentPrice)

    } catch (error: any) {
        console.error('Failed to fetch:', error.message)
        // Handle the error appropriately
    }
}

import { scraperAmazonProduct } from "../scraper"

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return

    try {
        const scrapedProduct = await scraperAmazonProduct(productUrl)
    } catch (error) {
        throw new Error(`Failed to create prodct: ${error}`)
    }
}

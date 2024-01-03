import axios from "axios"
import * as cheerio from 'cheerio'

export async function scraperAmazonProduct(url: string) {
    if (!url) return

    // Config bright data proxy
    const username = String(import.meta.env.VITE_BRIGHT_DATA_USERNAME)
    const password = String(import.meta.env.VITE_BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
        crossOriginIsolated: true,
    }

    try {
        const response = await axios.get(url, options)
        console.log(response.data)
    } catch (error) {
        throw new Error('Failed to fetch')
    }
}

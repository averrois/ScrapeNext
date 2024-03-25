import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";
import { HttpsProxyAgent } from "https-proxy-agent";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export async function scrapeAmazonProduct(
  url: string,
  req?: Request,
  res?: Response
) {
  if (!url) return;

  try {
    if (
      process.env.VITE_BRIGHT_DATA_USERNAME &&
      process.env.VITE_BRIGHT_DATA_PASSWORD
    ) {
      console.log("Using Bright Data proxy");
    }
    // Config bright data proxy
    const username = process.env.VITE_BRIGHT_DATA_USERNAME;
    const password = process.env.VITE_BRIGHT_DATA_PASSWORD;
    const port = 22225;

    const proxyUrl = `http://${username}:${password}@brd.superproxy.io:${port}`;
    const agent = new HttpsProxyAgent(proxyUrl);

    const brightDataResponse = await axios.get(url, {
      httpsAgent: agent,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });


    // Initialize Cheerio
    const $ = cheerio.load(brightDataResponse.data);

    // Extract product title
    const title = $("#productTitle").text().trim();

    // Extract product current price (discount)
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    // // Extract original
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price"),
      $("a-price-whole")
    );

    // Extract if the product is out of stack
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    // Extract images & oarsing them
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    // Extract currency
    const currency = extractCurrency($(".a-price-symbol"));

    // Extract discount percentage
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      isOutOfStock: outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
      // Other elements to add letter on
      category: "category",
      reviewsCount: 10,
      stars: 3,
    };

    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    res?.status(500).json({ error: "Internal server error" });
  }
}

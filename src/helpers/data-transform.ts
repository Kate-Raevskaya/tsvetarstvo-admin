import type { Product, ProductApiV1 } from "../types/types"

export function transformProductApiV1Data(products: ProductApiV1[]): Product[] {
  return products.map(product => {
    let price = ""
    if (product.variants.length === 1) {
      price = `${product.variants[0].price}P`
    } else {
      let prices: number[] = []
      for (let variant of product.variants) {
        prices.push(variant.price)
      }
      let minPrice = Math.min(...prices)
      let maxPrice = Math.max(...prices)
      price = `${minPrice} - ${maxPrice}P`
    }

    return { ...product, price: price }
  })
}

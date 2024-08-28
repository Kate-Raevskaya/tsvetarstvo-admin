import type { Product } from "../../types/types"
import { ProductCard } from "../ProductCard/ProductCard"
import "./ProductsContainer.scss"

type Props = {
  products: Product[]
}

export const ProductsContainer = ({ products }: Props) => {
  return (
    <div className="products-container">
      <div className="products">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

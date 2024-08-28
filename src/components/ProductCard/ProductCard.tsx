import { NavLink } from "react-router-dom"

import type { Product } from "../../types/types"
import "./ProductCard.scss"

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
      <NavLink to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt="product" />
        </div>
        <div className="product-disc">
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      </NavLink>
    </div>
  )
}

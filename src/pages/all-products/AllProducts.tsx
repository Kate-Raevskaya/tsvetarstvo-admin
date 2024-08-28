import { useSearchParams } from "react-router-dom"

import { ProductsContainer } from "../../components/ProductsContainer/ProductsContainer"
import { useGetAllProductsQuery } from "../../store/apiSlice"
import "./AllProducts.scss"

export const AllProducts = () => {
  let [searchParams, setSearchParams] = useSearchParams()

  let featured = !!(searchParams.get("featured") || "")

  let { data: products = [], isLoading } = useGetAllProductsQuery(featured)

  return (
    <div className="all-products">
      <ProductsContainer products={products} />
    </div>
  )
}

import { useSearchParams } from "react-router-dom"

import { ProductsContainer } from "../../components/ProductsContainer/ProductsContainer"
import { useGetAllProductsQuery } from "../../store/apiSlice"
import cls from "./AllProducts.module.scss"

export const AllProducts = () => {
  let [searchParams, setSearchParams] = useSearchParams()

  let featured = !!(searchParams.get("featured") || "")

  let { data: products = [], isLoading } = useGetAllProductsQuery(featured)

  return (
    <div className={cls.allProducts}>
      <ProductsContainer products={products} />
    </div>
  )
}

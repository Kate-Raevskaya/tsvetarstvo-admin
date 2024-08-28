import { useParams } from "react-router-dom"

import { ProductsContainer } from "../../components/ProductsContainer/ProductsContainer"
import { useGetProductsFromCategoryQuery } from "../../store/apiSlice"
import "./Products.scss"

export const Products = () => {
  let { id = "" } = useParams()
  let categoryId = parseInt(id)

  let { data: products = [], isLoading } =
    useGetProductsFromCategoryQuery(categoryId)

  return (
    <div className="category-product-container">
      {products.length === 0 ? (
        <div className="product-not-found">
          <p>Товаров из этой категории еще нет на сайте</p>
          <p>
            Нажите "Добавить новый товар" вверху страницы чтобы добавить товар в
            эту категорию
          </p>
        </div>
      ) : (
        <ProductsContainer products={products} />
      )}
    </div>
  )
}

import { logDOM } from "@testing-library/dom"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useGetProductByIdQuery } from "../../store/apiSlice"
import type { Product, Variant } from "../../types/types"
import "./ProductPage.scss"

type Props = {
  variant: Variant
}

export const ProductPage = () => {
  let [isEditing, setIsEditing] = useState<boolean>(false)
  let navigate = useNavigate()

  let { id = "" } = useParams()
  let productId = parseInt(id)

  let { data: product, isLoading } = useGetProductByIdQuery(productId)

  let [productDescription, setProductDescription] = useState<
    Product | undefined
  >(product)

  useEffect(() => {
    setProductDescription(product)
  }, [product])

  if (isLoading || productDescription === undefined) {
    return <p>Загрузка...</p>
  }

  if (product === undefined) {
    return <p>Что-то пошло не так...</p>
  }

  function handleSaveProduct() {
    setIsEditing(!isEditing)
  }

  function handleEditProduct() {
    setIsEditing(!isEditing)
  }

  return (
    <div className="product-page-container">
      <button
        className="go-back-button"
        onClick={() => {
          navigate(-1)
        }}
      >
        Назад
      </button>
      <div className="products-container">
        <div className="product-image">
          <img src={product.image} alt="product" />
        </div>
        {isEditing ? (
          <form className="edit-product-form">
            <label>
              <p>Наименование</p>
              <input
                type="text"
                value={productDescription.name}
                onChange={e =>
                  setProductDescription({
                    ...productDescription,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <p>Актуальный товар</p>
              <input
                type="checkbox"
                checked={productDescription.featured}
                onChange={e => {
                  console.log("here")
                  setProductDescription({
                    ...productDescription,
                    featured: !productDescription.featured,
                  })
                }}
              />
            </label>
            <label>
              <p>Тип товара</p>
              <select>
                <option value="bouqet">Букет</option>
                <option value="composition">Композиция</option>
              </select>
            </label>
            <label>
              <p>Дополнительная информация</p>
              <input type="text" />
            </label>
            <button
              className="save-product-button"
              onClick={handleSaveProduct}
              type="submit"
            >
              Сохранить
            </button>
          </form>
        ) : (
          <>
            <div className="product-desc">
              <p>{product.name}</p>
              <p>Актуально: {product.featured ? "да" : "нет"}</p>
              <p>Тип товара и описание</p>
              <p>доп.информация</p>
            </div>
            <button
              className="eddit-product-button"
              onClick={handleEditProduct}
            >
              Редактировать продукт
            </button>
          </>
        )}
      </div>
      <div className="variants-container">
        <p>Все размеры товара</p>
        <div className="variants">
          {product.variants.map(variant => {
            return <ProductVariant key={variant.id} variant={variant} />
          })}
        </div>
      </div>
      <button className="add-variant-button">Добавить размер</button>
    </div>
  )
}

const ProductVariant = ({ variant }: Props) => {
  let sizeAttribute = variant.attributes.find(
    attribute => attribute.name === "size",
  )

  if (sizeAttribute === undefined) {
    return <p>Что-то пошло не так</p>
  }

  let size = sizeAttribute.value.toUpperCase()

  return (
    <div className="variant">
      <p>{size}</p>
      <div className="variant-image">
        <img src={variant.image} alt="variant" />
      </div>
      <p>{variant.price}Р</p>
      <button className="delete-button">Удалить</button>
      <button className="edit-variant-button">Редактировать</button>
    </div>
  )
}

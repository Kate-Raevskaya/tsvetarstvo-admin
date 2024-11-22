import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useGetProductByIdQuery } from "../../store/apiSlice"
import { type Product, type Variant } from "../../types/types"
import cls from "./ProductPage.module.scss"

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

  function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault()
    //todo отправка измененного продукта
    setIsEditing(!isEditing)
  }

  function handleEditProduct() {
    setIsEditing(!isEditing)
  }

  return (
    <div className={cls.productPageContainer}>
      <button
        className={cls.goBackButton}
        onClick={() => {
          navigate(-1)
        }}
      >
        Назад
      </button>
      <div className={cls.productsContainer}>
        <div className={cls.productImage}>
          <img src={product.image} alt="product" />
        </div>
        {isEditing ? (
          <form className={cls.editProductForm} onSubmit={handleSaveProduct}>
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
            <button className={cls.saveProductButton} type="submit">
              Сохранить
            </button>
          </form>
        ) : (
          <>
            <div className={cls.productDesc}>
              <p>{product.name}</p>
              <p>Актуально: {product.featured ? "да" : "нет"}</p>
              <p>Тип товара и описание</p>
              <p>доп.информация</p>
            </div>
            <button
              className={cls.edditProductButton}
              onClick={handleEditProduct}
            >
              Редактировать продукт
            </button>
          </>
        )}
      </div>
      <div className={cls.variantsContainer}>
        <p>Все размеры товара</p>
        <div className={cls.variants}>
          {product.variants.map(variant => {
            return <ProductVariant key={variant.id} variant={variant} />
          })}
        </div>
      </div>
      <button className={cls.addVariantButton}>Добавить размер</button>
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
    <div className={cls.variant}>
      <p>{size}</p>
      <div className={cls.variantImage}>
        <img src={variant.image} alt="variant" />
      </div>
      <p>{variant.price}Р</p>
      <button className={cls.deleteButton}>Удалить</button>
      <button className={cls.editVariantButton}>Редактировать</button>
    </div>
  )
}

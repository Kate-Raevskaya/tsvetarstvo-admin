import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useGetProductByIdQuery } from "../../store/apiSlice"
import { type Product } from "../../types/types"
import cls from "./CreateProductPage.module.scss"

export const CreateProductPage = () => {
  let { id = "" } = useParams()
  let productId = parseInt(id)

  let { data: product, isLoading } = useGetProductByIdQuery(productId)

  const [productDesc, setProductDesc] = useState<Product | undefined>(product)

  useEffect(() => {
    setProductDesc(product)
  }, [product])

  return (
    <div className={cls.createPageContainer}>
      <form>
        <label>
          <p>Наименование</p>
          {/*<input type='text' name='name' value={} onChange={} />*/}
        </label>
        <label>
          <p>Описание</p>
          {/*<input type='text' name='description' value={} onChange={} />*/}
        </label>
        <label>
          <p>Тип товара</p>
          <select name="type">
            <option value="bouqet">Букет</option>
            <option value="composition">Композиция</option>
          </select>
        </label>
        <label>
          <p>Категория</p>
          {/*todo нужна ли подкатегория?*/}
          <select name="category">
            <option value="bouqet">Букет</option>
            <option value="composition">Композиция</option>
            <option value="mono">Моно</option>
            <option value="dried-flower">Сухоцветы</option>
            <option value="bride">Невестам</option>
            <option value="decor">Декор</option>
          </select>
        </label>
        <label>
          <p>Размер</p>
          {/*<input type="text" name="name" value={} onChange={} />*/}
        </label>
        <label>
          <p>Цена</p>
          {/*<input type='text' name='price' value={} onChange={} />*/}
        </label>
        <label>
          <p>Фото</p>
          {/*todo*/}
        </label>
        <div>
          <label>
            <p>Актуальный товар</p>
            <input
              type="checkbox"
              // checked={}
            />
          </label>
          <label>
            <p>Сделать обложкой</p>
            <input
              type="checkbox"
              // checked={}
            />
          </label>
        </div>
        <button type="submit">Добавить</button>
      </form>
    </div>
  )
}

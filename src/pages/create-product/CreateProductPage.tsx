import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { AddImage } from "./AddImage/AddImage"
import cls from "./CreateProductPage.module.scss"

export const CreateProductPage = () => {
  let { id = "" } = useParams()
  let productId = parseInt(id)

  // let { data: product, isLoading } = useGetProductByIdQuery(productId)
  //todo не подходит, нужен ендпоинт для полной информации о продукте

  const product = {
    id: Math.random(), //todo переделать
    name: "",
    description: "",
    type: "",
    category: "",
    size: "",
    price: "",
    imageUrl: "",
    featured: false,
    isMainImage: false,
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: product,
  })

  return (
    <div className={cls.createPageContainer}>
      <form
        className={cls.form}
        onSubmit={handleSubmit(data => {
          alert(JSON.stringify(data))
          console.log(data)
        })}
      >
        <label>
          Наименование
          <input {...register("name", { required: true })} />
        </label>
        {errors.name && <p>Это обязательное поле</p>}

        <label>
          Описание
          <input {...register("description")} />
        </label>

        <label>
          Тип товара
          <select {...register("type")}>
            <option value="bouqet">Букет</option>
            <option value="composition">Композиция</option>
          </select>
        </label>

        <label>
          Категория
          <select {...register("category")}>
            <option value="bouqet">Букет</option>
            <option value="composition">Композиция</option>
            <option value="mono-rose">Моно / Розы</option>
            <option value="mono-no-rose">Моно / Не розы</option>
            <option value="dried-flower-compositions">
              Сухоцветы / Авторсике композиции
            </option>
            <option value="dried-flower-mono">
              Сухоцветы / Моно сухоцветы
            </option>
            <option value="bride">Невестам</option>
            <option value="decor-wooden-products">Декор / Дерево</option>
            <option value="decor-vases">Декор / Вазы</option>
            <option value="decor-candles">Декор / Свечи</option>
          </select>
        </label>

        <label>
          Размер
          <select {...register("size")}>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
          </select>
        </label>

        <label>
          Цена
          <input {...register("price")} />
        </label>

        <AddImage register={register} setValue={setValue} />

        <label>
          Добавить в "актуальное"
          <input type="checkbox" {...register("featured")} />
        </label>

        <label>
          Сделать обложкой
          <input type="checkbox" {...register("isMainImage")} />
        </label>

        <button type="submit">Добавить</button>
      </form>
    </div>
  )
}

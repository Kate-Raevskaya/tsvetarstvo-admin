import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

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
    subcategory: "",
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
  } = useForm({
    defaultValues: product,
  })

  return (
    <div className={cls.createPageContainer}>
      <form
        className={cls.form}
        onSubmit={handleSubmit(data => {
          alert(JSON.stringify(data))
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

        {/*todo нужна ли подкатегория? или все в категории типо моно-розы, моно-не розы*/}
        <label>
          Категория
          <select {...register("category")}>
            <option value="bouqet">Букет</option>
            <option value="composition">Композиция</option>
            <option value="mono">Моно</option>
            <option value="dried-flower">Сухоцветы</option>
            <option value="bride">Невестам</option>
            <option value="decor">Декор</option>
          </select>
        </label>

        {watch("category") === "decor" && (
          <label>
            Раздел
            <select {...register("subcategory")}>
              <option value="1">Дерево</option>
              <option value="2">Вазы</option>
              <option value="3">Свечи</option>
            </select>
          </label>
        )}

        <label>
          Размер
          <input {...register("size")} />
        </label>

        <label>
          Цена
          <input {...register("price")} />
        </label>

        <label>
          Цена
          <input {...register("price")} />
        </label>

        <label>
          {/*todo добавление фото*/}
          Фото
          <input {...register("imageUrl")} />
        </label>

        <div>
          <label>
            Актуальный товар
            <input type="checkbox" {...register("featured")} />
          </label>

          <label>
            Сделать обложкой
            <input type="checkbox" {...register("isMainImage")} />
          </label>
        </div>

        <button type="submit">Добавить</button>
      </form>
    </div>
  )
}

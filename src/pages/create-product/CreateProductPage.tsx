import { Field, Form, Formik } from "formik"
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
    size: "",
    price: "",
    imageUrl: "",
    featured: false,
    isMainImage: false,
  }

  return (
    <div className={cls.createPageContainer}>
      <Formik
        initialValues={product}
        onSubmit={(values, { setSubmitting }) => {
          //todo тут отправка данных на сервер
          setTimeout(() => {
            console.log(JSON.stringify(values))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form className={cls.form}>
            <label>
              Наименование
              <Field name="name" />
            </label>

            <label>
              Описание
              <Field name="description" />
            </label>

            <label>
              Тип товара
              <Field as="select" id="type" name="type">
                <option value="bouqet">Букет</option>
                <option value="composition">Композиция</option>
              </Field>
            </label>

            {/*todo нужна ли подкатегория? или все в категории типо моно-розы, моно-не розы*/}
            <label>
              Категория
              <Field as="select" id="category" name="category">
                <option value="bouqet">Букет</option>
                <option value="composition">Композиция</option>
                <option value="mono">Моно</option>
                <option value="dried-flower">Сухоцветы</option>
                <option value="bride">Невестам</option>
                <option value="decor">Декор</option>
              </Field>
            </label>

            {/*{values.category === "decor" ?? <p>hrer</p>}*/}

            <label>
              Размер
              <Field id="size" name="size" />
            </label>

            <label>
              Цена
              <Field id="price" name="price" />
            </label>

            {/*todo добавление фото*/}
            <label>
              Фото
              <Field id="imageUrl" name="imageUrl" />
            </label>

            <div>
              <label>
                Актуальный товар
                <Field type="checkbox" id="featured" name="featured" />
              </label>

              <label>
                Сделать обложкой
                <Field type="checkbox" name="isMainImage" />
              </label>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

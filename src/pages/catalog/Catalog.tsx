import { NavLink, Outlet } from "react-router-dom"

import { Navbar } from "../../components/Navbar/Navbar"
import { useGetAllCategoriesQuery } from "../../store/apiSlice"
import type { Category } from "../../types/types"
import cls from "./Catalog.module.scss"

type Props = {
  categories: Category[]
}

export const Catalog = () => {
  let { data: categories = [], isLoading } = useGetAllCategoriesQuery()

  return (
    <div className={cls.catalogContainer}>
      <Navbar />
      <div className={cls.categoriesName}>
        <NavLink className={cls.categoryName} to={""}>
          Все товары
        </NavLink>
        <NavLink className={cls.categoryName} to={".?featured=1"}>
          Актуальное
        </NavLink>
        <Categories categories={categories} />
      </div>
      <Outlet />
    </div>
  )
}

const Categories = ({ categories }: Props) => {
  return (
    <>
      {categories.map(category => {
        let categoryLink = ""
        if (category.subcategories.length > 0) {
          categoryLink = `subcategories/${category.id}`
        } else {
          categoryLink = `category/${category.id}`
        }
        return (
          <NavLink
            className={cls.categoryName}
            key={category.id}
            to={categoryLink}
          >
            {category.name}
          </NavLink>
        )
      })}
    </>
  )
}

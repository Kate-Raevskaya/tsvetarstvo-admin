import { NavLink, Outlet } from "react-router-dom"

import { Navbar } from "../../components/Navbar/Navbar"
import { useGetAllCategoriesQuery } from "../../store/apiSlice"
import type { Category } from "../../types/types"

type Props = {
  categories: Category[]
}

export const Catalog = () => {
  let { data: categories = [], isLoading } = useGetAllCategoriesQuery()

  return (
    <div className="catalog-container">
      <Navbar />
      <div className="categories-name">
        <NavLink className="category-name" to={""}>
          Все товары
        </NavLink>
        <NavLink className="category-name" to={".?featured=1"}>
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
            className="category-name"
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

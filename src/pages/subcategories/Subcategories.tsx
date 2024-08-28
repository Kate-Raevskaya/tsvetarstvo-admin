import { NavLink, useParams } from "react-router-dom"

import { useGetSubcategoriesQuery } from "../../store/apiSlice"
import type { Category } from "../../types/types"
import "./Subcategories.scss"

type Props = {
  subcategories: Category[]
}

export const Subcategories = () => {
  let { id = "" } = useParams()
  let categoryId = parseInt(id)

  let { data: subcategories = [], isLoading } =
    useGetSubcategoriesQuery(categoryId)

  return (
    <div className="subcat-container">
      <div className="subcat-list">
        <SubcategoriesList subcategories={subcategories} />
      </div>
    </div>
  )
}

const SubcategoriesList = ({ subcategories }: Props) => {
  return (
    <>
      {subcategories.map(subcategory => {
        let categoryLink = ""
        if (subcategory.subcategories.length > 0) {
          categoryLink = `/catalog/subcategory/${subcategory.id}`
        } else {
          categoryLink = `/catalog/category/${subcategory.id}`
        }
        return (
          <NavLink
            className="subcategory"
            key={subcategory.id}
            to={categoryLink}
          >
            <div className="subcat-img">
              <img src={subcategory.img} alt="subcategory" />
            </div>
            {subcategory.name}
          </NavLink>
        )
      })}
    </>
  )
}

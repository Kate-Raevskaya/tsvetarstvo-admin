import { NavLink } from "react-router-dom"

export const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to={"/editing"} className="add-new-product-button">
        Добавить новый продукт
      </NavLink>
      <button className="logout-button">Выйти</button>
    </div>
  )
}

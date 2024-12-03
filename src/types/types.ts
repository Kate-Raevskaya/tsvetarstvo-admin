export type Category = {
  id: number
  subcategories: Number[]
  name: string
  img: string
  parent_id?: number
}

export type ProductApiV1 = {
  id: number
  name: string
  image: string
  variants: Variant[]
  featured: boolean
  category_id: number
}

export type Product = {
  id: number
  name: string
  image: string
  price: string
  variants: Variant[]
  featured: boolean
  category_id: number
}

export type Variant = {
  id: number
  name: string
  product_id: number
  price: number
  attributes: Attribute[]
  image: string
}

export type Attribute = {
  //размер, цвет и тд
  id: number
  name: string
  value: string
}

export type FullProductData = {
  id: number
  name: string
  description: string
  type: string
  category: string
  size: string
  price: string
  imageUrl: string
  featured: boolean
  isMainImage: boolean
}

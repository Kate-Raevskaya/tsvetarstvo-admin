import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { transformProductApiV1Data } from "../helpers/data-transform"
import type { Category, Product } from "../types/types"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1/" }),
  endpoints: builder => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "categories",
      }),
    }),
    getAllProducts: builder.query<Product[], boolean>({
      query: featured => {
        if (featured) {
          return "products?featured=1"
        }
        return "products"
      },
      transformResponse: transformProductApiV1Data,
    }),
    getSubcategories: builder.query<Category[], number>({
      query: id => ({
        url: `categories?parent=${id}`,
      }),
    }),
    getProductsFromCategory: builder.query<Product[], number>({
      query: id => ({
        url: `products?category=${id}`,
      }),
      transformResponse: transformProductApiV1Data,
    }),
  }),
})

export const {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetSubcategoriesQuery,
  useGetProductsFromCategoryQuery,
} = apiSlice

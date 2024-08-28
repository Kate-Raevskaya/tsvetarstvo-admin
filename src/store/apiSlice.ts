import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { Category } from "../types/types"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1/" }),
  endpoints: builder => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "categories",
      }),
    }),
  }),
})

export const { useGetAllCategoriesQuery } = apiSlice

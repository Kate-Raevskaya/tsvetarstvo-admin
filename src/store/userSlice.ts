import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  email: string | null
}

let initialState: UserState = {
  email: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email
    },
    removeUser(state, action: PayloadAction<UserState>) {
      state.email = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const userReducer = userSlice.reducer

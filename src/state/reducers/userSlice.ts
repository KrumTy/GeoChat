import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type User = {
  id: number;
  name: string;
}

// Define a type for the slice state
interface UserState {
  value: User
}

// Define the initial state using that type
const initialState: UserState = {
  value: {
    id: 0,
    name: "Test User 1"
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer

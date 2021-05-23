import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
};

// Define a type for the slice state
interface UserState {
  value: User;
}

// Define the initial state using that type
const initialState: UserState = {
  value: {
    id: 1,
    name: 'Test User 1',
    avatarUrl:
      'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;

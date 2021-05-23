import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import mockUsers from '../../static/mockUsers';

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
};

interface UserState {
  value: User;
  coordinates: number[];
}

const initialState: UserState = {
  value: {...mockUsers[0]},
  coordinates: [0, 0],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    setCoordinates: (state, action: PayloadAction<number[]>) => {
      state.coordinates = action.payload;
    },
  },
});

export const {setUser, setCoordinates} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;
export const selectCoordinates = (state: RootState) => state.user.coordinates;

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// type Comment = {
//   id: number;
//   authorId: number;
//   timestamp: number;
//   text: string;
// }

export type Shout = {
  id: number;
  frameId: number;
  authorId: number; // get avatar src from here
  text: string;
  coordinates: number[];
  // comments: Comment[];
}

// Define a type for the slice state
interface ShoutsState {
  value: Shout[];
  shoutPoints: number;
}

// Define the initial state using that type
const initialState: ShoutsState = {
  value: [],
  shoutPoints: 15
}

export const shoutsSlice = createSlice({
  name: 'shouts',
  initialState,
  reducers: {
    addShout: (state, action: PayloadAction<Shout>) => {
      state.value.push(action.payload);
      state.shoutPoints -= 3;
    },
    resetShoutPoints: (state) => {
      state.shoutPoints = 15;
    }
  },
})

export const { addShout, resetShoutPoints } = shoutsSlice.actions;

export const selectShouts = (state: RootState) => state.shouts.value;
export const selectShoutPoints = (state: RootState) => state.shouts.shoutPoints;

export default shoutsSlice.reducer;

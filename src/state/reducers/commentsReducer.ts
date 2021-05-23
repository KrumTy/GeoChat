import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-community/async-storage"
import type { RootState } from '../store'
import { Alert } from "react-native"

export type Comment = {
  id: number;
  shoutId: number;
  authorId: number;
  timestamp: number;
  text: string;
}

// Define a type for the slice state
interface ShoutsState {
  value: Comment[];
  selectedShoutId: number | null;
}

// Define the initial state using that type
const initialState: ShoutsState = {
  value: [],
  selectedShoutId: null
}

const getCommentsStorageKey = (shoutId: number) => `shout-comments-${shoutId}`;

export const loadShoutComments = createAsyncThunk(
  'loadShoutComments',
  async (shoutId: number) => {
    const storedComments = await AsyncStorage.getItem(getCommentsStorageKey(shoutId));
    const comments = JSON.parse(storedComments || "[]") as Comment[];
    const payload: ShoutsState = {
      value: comments,
      selectedShoutId: shoutId
    };
    return payload;
  }
)

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addShoutComment: (state, action: PayloadAction<Comment>) => {
      state.value.push(action.payload);
      AsyncStorage.setItem(getCommentsStorageKey(action.payload.shoutId), JSON.stringify(state.value));
    },
    resetComments: (state) => {
      state.value = [];
      state.selectedShoutId = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadShoutComments.fulfilled, (state, action) => {
      state.value = action.payload.value;
      state.selectedShoutId = action.payload.selectedShoutId;
    });
  },
})

export const { addShoutComment, resetComments } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.value;
export const selectSelectedShoutId = (state: RootState) => state.comments.selectedShoutId;

export default commentsSlice.reducer;

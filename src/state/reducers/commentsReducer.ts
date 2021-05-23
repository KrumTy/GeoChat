import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {getDataByKey, setDataByKey} from '../localStorage';

export type Comment = {
  id: number;
  shoutId: number;
  authorId: number;
  authorAvatarUrl: string;
  timestamp: number;
  text: string;
};

// Define a type for the slice state
interface ShoutsState {
  value: Comment[];
}

// Define the initial state using that type
const initialState: ShoutsState = {
  value: [],
};

export const getCommentsStorageKey = (shoutId: number) =>
  `shout-comments-${shoutId}`;

export const loadShoutComments = createAsyncThunk(
  'loadShoutComments',
  async (shoutId: number) =>
    (await getDataByKey<Comment[]>(getCommentsStorageKey(shoutId))) || [],
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addShoutComment: (state, action: PayloadAction<Comment>) => {
      state.value.unshift(action.payload);
      setDataByKey(getCommentsStorageKey(action.payload.shoutId), state.value);
    },
    resetComments: state => {
      state.value = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadShoutComments.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const {addShoutComment, resetComments} = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.value;

export default commentsSlice.reducer;

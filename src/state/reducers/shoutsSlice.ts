import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {getDataByKey, setDataByKey} from '../localStorage';

export type Shout = {
  id: number;
  frameId: number;
  authorId: number; // get avatar src from here
  text: string;
  coordinates: number[];
};

interface ShoutsState {
  value: Shout[];
  shoutPoints: number;
}

const initialShoutPoints = 15;
const pointsPerShout = 3;

const initialState: ShoutsState = {
  value: [],
  shoutPoints: -1,
};

export const getShoutsStorageKey = () => 'shouts';
const getShoutPointsStorageKey = (userId: number) =>
  `shout-points-user-${userId}`;

export const loadShouts = createAsyncThunk(
  'loadShouts',
  async (_coordinates: number[]) =>
    (await getDataByKey<Shout[]>(getShoutsStorageKey())) || [],
);

export const loadShoutPoints = createAsyncThunk(
  'loadShoutPoints',
  async (userId: number) => {
    const points = await getDataByKey<number>(getShoutPointsStorageKey(userId));
    return points === null ? initialShoutPoints : points;
  },
);

export const resetShoutPoints = createAsyncThunk(
  'resetShoutPoints',
  async (userId: number) => {
    await setDataByKey(getShoutPointsStorageKey(userId), initialShoutPoints);
    return initialShoutPoints;
  },
);

export const shoutsSlice = createSlice({
  name: 'shouts',
  initialState,
  reducers: {
    addShout: (state, action: PayloadAction<Shout>) => {
      if (state.shoutPoints < pointsPerShout) {
        return;
      }

      state.value.push(action.payload);
      state.shoutPoints -= pointsPerShout;
      setDataByKey(getShoutsStorageKey(), state.value);
      setDataByKey(
        getShoutPointsStorageKey(action.payload.authorId),
        state.shoutPoints,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(loadShouts.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(loadShoutPoints.fulfilled, (state, action) => {
      state.shoutPoints = action.payload;
    });
    builder.addCase(resetShoutPoints.fulfilled, (state, action) => {
      state.shoutPoints = action.payload;
    });
  },
});

export const {addShout} = shoutsSlice.actions;

export const selectShouts = (state: RootState) => state.shouts.value;
export const selectShoutPoints = (state: RootState) => state.shouts.shoutPoints;

export default shoutsSlice.reducer;

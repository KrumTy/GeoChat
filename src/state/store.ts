import {configureStore} from '@reduxjs/toolkit';
import shoutsReducer from './reducers/shoutsSlice';
import userReducer from './reducers/userSlice';
import commentsReducer from './reducers/commentsReducer';

export const store = configureStore({
  reducer: {
    shouts: shoutsReducer,
    user: userReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

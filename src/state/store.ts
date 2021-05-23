import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import shoutsReducer from './reducers/shoutsSlice';
import userReducer from './reducers/userSlice';
import commentsReducer from './reducers/commentsReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shouts: shoutsReducer,
    user: userReducer,
    comments: commentsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

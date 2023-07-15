import { configureStore } from '@reduxjs/toolkit'
import formSlice from './formSlice'
import logger from 'redux-logger'
import tabSlice from './tabSlice'
import createSagaMiddleware from "@redux-saga/core";
import formSaga from './apiSaga';
import notiSlice from './notiSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    form: formSlice,
    tab: tabSlice,
    notification: notiSlice
  },
 middleware: [ sagaMiddleware]
});
sagaMiddleware.run(formSaga);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
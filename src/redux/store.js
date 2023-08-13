import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga/productSaga';
import productsSlice from './pruductSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export default store;

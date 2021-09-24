import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';

export default configureStore({
  reducer: {
    // pass CryptoAPI to Redux store
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
})

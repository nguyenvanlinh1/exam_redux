import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { dogApi } from './service/dog.service';

export const store = configureStore({
  reducer: {
    [dogApi.reducerPath]: dogApi.reducer
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(dogApi.middleware)
  },
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
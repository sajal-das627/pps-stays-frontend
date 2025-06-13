import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // stays: staysReducer // only if you need local redux state
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

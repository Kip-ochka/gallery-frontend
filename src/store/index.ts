import { configureStore } from '@reduxjs/toolkit'
import adminRedusers from './adminSlice'

const store = configureStore({
  reducer: { adminSlice: adminRedusers },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

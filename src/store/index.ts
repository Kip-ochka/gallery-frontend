import { configureStore } from '@reduxjs/toolkit'
import adminRedusers from './adminSlice'
import tagInterface from './tagInterface'

const store = configureStore({
  reducer: { admin: adminRedusers, tagInterface: tagInterface },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

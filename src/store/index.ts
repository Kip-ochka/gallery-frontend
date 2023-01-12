import { configureStore } from '@reduxjs/toolkit'
import adminRedusers from './adminSlice'
import tagInterface from './tagInterface'
import sectionsReducer from './sectionsSlice'
import imagesSlice from './imageSlice'
const store = configureStore({
  reducer: {
    admin: adminRedusers,
    tagInterface: tagInterface,
    sections: sectionsReducer,
    images: imagesSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import adminRedusers from './adminSlice'
import tagSlice from './tagInterfaceSlice'
import sectionsReducer from './sectionsSlice'

const store = configureStore({
  reducer: {
    admin: adminRedusers,
    tag: tagSlice,
    sections: sectionsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import adminRedusers from './adminSlice'
import tagSlice from './tagInterface'

import tagInterface from './tagInterface'
import sectionsReducer from './sectionsSlice'
const store = configureStore({
  reducer: {
    admin: adminRedusers,
    tagInterface: tagInterface,
    sections: sectionsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

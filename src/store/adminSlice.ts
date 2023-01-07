import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: '',
    aboutMe: '',
  },
  reducers: {},
})

export default adminSlice.reducer

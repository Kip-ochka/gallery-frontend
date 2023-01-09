import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const adminAuth = createAsyncThunk(
  'admin/auth',
  async (payload: string) => {
    const response = await fetch('http://localhost:5000/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: payload }),
    })

    const data = await response.json()
    return data
  }
)
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: '',
    aboutMe: '',
    isLogged: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token
      state.isLogged = true
    },
  },
})
export const { setToken } = adminSlice.actions
export default adminSlice.reducer

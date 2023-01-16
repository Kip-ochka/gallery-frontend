import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IAdminStateInterface, IsetAboutMe } from '../types/models'

export const adminAuth = createAsyncThunk<string, string>(
  'admin/auth',
  async (payload: string) => {
    const response = await fetch('http://localhost:5000/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: payload }),
    })
    if (response.ok) {
      const data = await response.json()
      return data.token
    } else {
      throw new Error(response.statusText)
    }
  }
)

export const checkAuth = createAsyncThunk<string, string | null>(
  'admin/check',
  async (arg) => {
    if (typeof arg === 'string') {
      const response = await fetch('http://localhost:5000/admin/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: arg }),
      })
      if (response.ok) {
        return arg
      } else {
        throw new Error(response.statusText)
      }
    } else {
      throw new Error('Нет токена в локальном хранилище')
    }
  }
)

export const getAbout = createAsyncThunk(
  'admin/about',
  async (_, { rejectWithValue }) => {
    const response = await fetch('http://localhost:5000/about', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      const data = await response.json()
      const admin = JSON.parse(data.Admin.aboutMe)
      return admin
    } else {
      rejectWithValue(response.statusText)
    }
  }
)

export const setAboutMe = createAsyncThunk(
  'admin/set-about',
  async (toResponse: { token: string; textValue: any }) => {
    const json = JSON.stringify(toResponse.textValue)
    await fetch('http://localhost:5000/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: { token: toResponse.token },
        info: { info: json },
      }),
    })
    return toResponse.textValue
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    aboutMe: {},
    isLogged: false,
    error: null,
    authError: null,
    loading: true,
    aboutLoading: false,
    aboutError: null,
  } as IAdminStateInterface,
  reducers: {
    logout: (state) => {
      state.isLogged = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminAuth.pending, (state) => {
        state.error = null
        state.authError = null
        state.loading = true
      })
      .addCase(adminAuth.fulfilled, (state, action) => {
        state.error = null
        state.authError = null
        state.loading = false
        state.isLogged = true
      })
      .addCase(adminAuth.rejected, (state, { error }) => {
        state.loading = false
        state.isLogged = false
        state.authError = `${error.name}: ${error.message}`
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.isLogged = true
      })
      .addCase(checkAuth.rejected, (state, { error }) => {
        state.loading = false
        state.isLogged = false
        state.error = `${error.name}: ${error.message}`
      })
      .addCase(getAbout.pending, (state) => {
        state.aboutLoading = true
        state.aboutError = null
      })
      .addCase(getAbout.fulfilled, (state, action) => {
        state.aboutLoading = false
        state.aboutError = null
        state.aboutMe = action.payload
      })
      .addCase(getAbout.rejected, (state, { error }) => {
        state.aboutLoading = false
        state.aboutError = `${error.name}: ${error.message}`
      })
      .addCase(setAboutMe.pending, (state, action) => {
        state.aboutLoading = true
        state.aboutError = null
      })
      .addCase(setAboutMe.fulfilled, (state, action) => {
        state.aboutLoading = false
        state.aboutMe = action.payload
      })
      .addCase(setAboutMe.rejected, (state, action) => {
        state.aboutLoading = false
        state.aboutError = `${action.error.name}: ${action.error.message}`
      })
  },
})
export const { logout } = adminSlice.actions
export default adminSlice.reducer

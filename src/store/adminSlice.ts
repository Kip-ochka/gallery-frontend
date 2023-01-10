import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit'
import { ErrorResponse } from '@remix-run/router'

interface AdminStateInterface {
  token: string | null
  aboutMe: string | null
  isLogged: boolean
  error: null | string
  authError: null | string
  loading: boolean
  aboutLoading: boolean
  aboutError: null | string
}

export const adminAuth = createAsyncThunk<string, string>(
  'admin/auth',
  async (payload) => {
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

export const getAbout = createAsyncThunk('admin/about', async () => {
  const response = await fetch('http://localhost:5000/about', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.ok) {
    const data = response.json()
    return data
  } else {
    throw new Error(response.statusText)
  }
})
interface IsetAboutMe {
  textValue: string
  token: string
}
export const setAboutMe = createAsyncThunk<IsetAboutMe, IsetAboutMe>(
  'admin/set-about',
  async (toResponse) => {
    const response = await fetch('http://localhost:5000/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: { token: toResponse.token },
        info: { info: toResponse.textValue },
      }),
    })
    return toResponse
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: '',
    aboutMe: '',
    isLogged: false,
    error: null,
    authError: null,
    loading: true,
    aboutLoading: false,
    aboutError: null,
  } as AdminStateInterface,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token
      state.isLogged = true
    },
    checkToken: (state, action) => {
      state.isLogged = true
      state.token = action.payload.token
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
        state.token = action.payload
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
        state.token = action.payload
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
        state.aboutMe = action.payload.Admin.aboutMe
      })
      .addCase(getAbout.rejected, (state, { error }) => {
        state.aboutError = `${error.name}: ${error.message}`
      })
      .addCase(setAboutMe.pending, (state, action) => {
        state.aboutLoading = true
        state.aboutError = null
      })
      .addCase(setAboutMe.fulfilled, (state, action) => {
        state.aboutLoading = false
        state.aboutMe = action.payload.textValue
      })
      .addCase(setAboutMe.rejected, (state, action) => {
        state.aboutLoading = false
        state.aboutError = `${action.error.name}: ${action.error.message}`
      })
  },
})
export const { setToken, checkToken } = adminSlice.actions
export default adminSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

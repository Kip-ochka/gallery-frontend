import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit'

interface AdminStateInterface {
  token: string | null
  aboutMe: string | null
  isLogged: boolean
  error: null | string
  authError: null | string
  loading: boolean
}

export const adminAuth = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('admin/auth', async (payload, { rejectWithValue }) => {
  const response = await fetch('http://localhost:5000/admin/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: payload }),
  })
  if (response.ok) {
    const data = await response.json()
    const result = data.token
    return result
  } else {
    return rejectWithValue('Ошибка во время авторизации.')
  }
})

export const checkAuth = createAsyncThunk<
  null | string,
  string | null,
  { rejectValue: string }
>('admin/check', async (arg, { rejectWithValue }) => {
  console.log(arg)
  if (typeof arg === 'string') {
    const response = await fetch('http://localhost:5000/admin/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: arg }),
    })
    if (response.ok) {
      return arg
    } else {
      return rejectWithValue('Авторизация не удалась')
    }
  } else {
    return rejectWithValue('Нет токена')
  }
})

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: '',
    aboutMe: '',
    isLogged: false,
    error: null,
    authError: null,
    loading: true,
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
      .addCase(adminAuth.pending, (state, action) => {
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
      .addCase(adminAuth.rejected, (state, action) => {
        state.loading = false
        state.isLogged = false
        state.authError = action.payload!
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
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false
        state.isLogged = false
        state.error = action.payload!
      })
  },
})
export const { setToken, checkToken } = adminSlice.actions
export default adminSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

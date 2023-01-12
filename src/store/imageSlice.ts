import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IImages, ITag } from '../types/models'

export const getImages = createAsyncThunk('images/get-images', async () => {
  const res = await fetch(`http://localhost:5000/images`)
  const data = await res.json()
  return data
})

export const addImage = createAsyncThunk(
  'images/addImage',
  async ({ toSend }: { toSend: File }, { rejectWithValue }) => {
    const fd = new FormData()
    fd.append('upload_image', toSend)
    const response = await fetch(`http://localhost:5000/images`, {
      method: 'POST',
      body: fd,
    })
    if (response.ok) {
      const res = await response.json()
      return res
    } else {
      rejectWithValue(response.statusText)
    }
  }
)

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    loading: false,
    getImagesError: null,
    file: undefined,
    fileUrl: '',
  } as IImages,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.loading = true
        state.getImagesError = null
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.images = action.payload
        state.loading = false
      })
      .addCase(getImages.rejected, (state, action) => {
        state.getImagesError = `${action.error.name}: ${action.error.message}`
        state.loading = false
      })
      .addCase(addImage.pending, (state, action) => {
        state.loading = true
        state.getImagesError = null
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.loading = false
        state.getImagesError = null
      })
      .addCase(addImage.rejected, (state, action) => {
        state.loading = false
        state.getImagesError = `${action.error.name}: ${action.error.message}`
      })
  },
})

export default imagesSlice.reducer

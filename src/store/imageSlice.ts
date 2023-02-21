import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IImages, IPhoto, ITag } from '../types/models'
import { BASE_URL } from '../utils/constants'
import chunkify, { divideImagesArray } from '../utils/divideImagesArray'

export const getImages = createAsyncThunk(
  'images/get-images',
  async (sectionId: { sectionId: undefined | string }, { rejectWithValue }) => {
    if (typeof sectionId.sectionId === 'string') {
      const res = await fetch(`${BASE_URL}sections/${sectionId.sectionId}`, {
        method: 'GET',
      })
      if (res.ok) {
        const data = await res.json()
        return data
      }
      return rejectWithValue(res.statusText)
    }
    const res = await fetch(`${BASE_URL}images`, {
      method: 'GET',
    })
    if (res.ok) {
      const data = await res.json()
      return data
    }
    return rejectWithValue(res.statusText)
  }
)

export const addImage = createAsyncThunk(
  'images/addImage',
  async (
    { toSend, token }: { toSend: File; token: string },
    { rejectWithValue }
  ) => {
    const fd = new FormData()
    fd.append('upload_image', toSend)
    const response = await fetch(`${BASE_URL}images?token=${token}`, {
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

export const deleteImage = createAsyncThunk<
  void,
  { image: IPhoto; token: string },
  { rejectValue: string }
>(
  'images/deleteImage',
  async ({ image, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}images/${image.imageId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (!response.ok) {
        throw new Error('Ошибка сервера при попытке удаления фото')
      }
      dispatch(getImages({ sectionId: undefined }))
    } catch (error: any) {
      rejectWithValue(error.message)
    }
  }
)
export const addTagToImage = createAsyncThunk<
  void,
  { image: IPhoto; tag: ITag; token: string },
  { rejectValue: string }
>(
  'images/addTagToImage',
  async ({ image, tag, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}images/${image.imageId}/tags/${tag.tagId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )
      if (!response.ok) {
        throw new Error('Ошибка сервера при попытке добавления тега к фото')
      }
      dispatch(getImages({ sectionId: undefined }))
    } catch (error: any) {
      rejectWithValue(error.message)
    }
  }
)
export const removeTagFromImage = createAsyncThunk<
  void,
  { image: IPhoto; tag: ITag; token: string },
  { rejectValue: string }
>(
  'images/removeTagFromImage',
  async ({ image, tag, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}images/${image.imageId}/tags/${tag.tagId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )
      if (!response.ok) {
        throw new Error('Ошибка сервера при попытке удаления тега с фото')
      }
      dispatch(getImages({ sectionId: undefined }))
    } catch (error: any) {
      rejectWithValue(error.message)
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
    chunks: [],
  } as IImages,
  reducers: {
    chunkImages: (state, action) => {
      const number = divideImagesArray(action.payload)
      state.chunks = chunkify(state.images, number, true)
    },
  },
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
      .addCase(deleteImage.pending, (state) => {
        state.loading = true
        state.getImagesError = null
      })
      .addCase(deleteImage.fulfilled, (state) => {
        state.loading = false
        state.getImagesError = null
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false
        state.getImagesError = `${action.error.name}: ${action.error.message}`
      })
      .addCase(addTagToImage.pending, (state) => {
        state.loading = true
        state.getImagesError = null
      })
      .addCase(addTagToImage.fulfilled, (state) => {
        state.loading = false
        state.getImagesError = null
      })
      .addCase(addTagToImage.rejected, (state, action) => {
        state.loading = false
        state.getImagesError = `${action.error.name}: ${action.error.message}`
      })
      .addCase(removeTagFromImage.pending, (state) => {
        state.loading = true
        state.getImagesError = null
      })
      .addCase(removeTagFromImage.fulfilled, (state) => {
        state.loading = false
        state.getImagesError = null
      })
      .addCase(removeTagFromImage.rejected, (state, action) => {
        state.loading = false
        state.getImagesError = `${action.error.name}: ${action.error.message}`
      })
  },
})
export const { chunkImages } = imagesSlice.actions
export default imagesSlice.reducer

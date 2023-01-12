import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/constants'
import {
  ITag,
  Section,
  SectionsSliceState,
  ActionPayload,
} from '../types/models'

export const getSections = createAsyncThunk<
  Section[],
  void,
  { rejectValue: string }
>('section/segSection', async function (_, { rejectWithValue }) {
  try {
    const res = await fetch(`${BASE_URL}sections`)
    if (!res.ok) {
      throw new Error('Ошибка при получении списка секций с сервера')
    }
    return res.json()
  } catch (err: any) {
    return rejectWithValue(err.message)
  }
})

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [],
    isLoading: false,
    error: null,
  } as SectionsSliceState,
  reducers: {
    createSection: (state, action: PayloadAction<Section>) => {
      state.sections.push(action.payload)
    },
    removeSection: (state, action: PayloadAction<Section>) => {
      state.sections = state.sections.filter(
        (e) => e.sectionId !== action.payload.sectionId
      )
    },
    addTag: (state, action: PayloadAction<ActionPayload>) => {
      const sectionToEdit = state.sections.find(
        (e) => e.sectionId === action.payload.section.sectionId
      ) as Section
      sectionToEdit.tags.push(action.payload.tag)
    },
    deleteTag: (state, action: PayloadAction<ActionPayload>) => {
      const sectionToEdit = state.sections.find(
        (e) => e.sectionId === action.payload.section.sectionId
      ) as Section
      sectionToEdit.tags = sectionToEdit.tags.filter(
        (e) => e.tagId !== action.payload.tag.tagId
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSections.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.error = null
        state.isLoading = false
        state.sections = action.payload
      })
      .addCase(getSections.rejected, (state, action) => {
        state.error = null
        state.isLoading = false
        state.error = action.payload ? action.payload : null
      })
  },
})
export const { addTag, deleteTag, createSection, removeSection } =
  sectionsSlice.actions

export default sectionsSlice.reducer

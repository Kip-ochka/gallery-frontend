import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/constants'
import {
  Section,
  SectionsSliceState,
  ActionPayload,
  ITag,
} from '../types/models'

const setFulfilled = (state: SectionsSliceState) => {
  state.isLoading = false
  state.error = null
}
const setPending = (state: SectionsSliceState) => {
  state.isLoading = true
  state.error = null
}
const setRejected = (
  state: SectionsSliceState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false
  state.error = action.payload ? action.payload : null
}

export const getSections = createAsyncThunk<
  Section[],
  void,
  { rejectValue: string }
>('sections/getSections', async function (_, { rejectWithValue }) {
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

export const createNewSection = createAsyncThunk<
  void,
  { section: Section; token: string },
  { rejectValue: string }
>(
  'sections/createSection',
  async function ({ section, token }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(
        `${BASE_URL}sections?section=${section.section}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )
      if (!res.ok) {
        throw new Error('Ошибка при создании новой секции на сервере')
      } else dispatch(getSections())
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteSection = createAsyncThunk<
  void,
  { section: Section; token: string },
  { rejectValue: string }
>(
  'sections/deleteSection',
  async function ({ section, token }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BASE_URL}sections/${section.sectionId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (!res.ok) {
        throw new Error('Ошибка при удалении на сервере')
      } else dispatch(getSections())
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const renameSection = createAsyncThunk<
  void,
  { section: Section; newName: string; token: string },
  { rejectValue: string }
>(
  'sections/renameSection',
  async function ({ section, newName, token }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(
        `${BASE_URL}sections/${section.sectionId}?section=${newName}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )
      if (!res.ok) {
        throw new Error('Ошибка при попытке переименования секции на сервере')
      } else dispatch(getSections())
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const addTagToSection = createAsyncThunk<
  void,
  { section: Section; tag: ITag; token: string },
  { rejectValue: string }
>(
  'sections/addTagToSection',
  async function ({ section, tag, token }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(
        `${BASE_URL}sections/${section.sectionId}/tags/${tag.tagId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )
      if (!res.ok) {
        throw new Error('Ошибка при добавления тега на секцию на сервере')
      } else dispatch(getSections())
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const removeTagFromSection = createAsyncThunk<
  void,
  { section: Section; tag: ITag; token: string },
  { rejectValue: string }
>(
  'sections/removeTagFromSection',
  async function ({ section, tag, token }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(
        `${BASE_URL}sections/${section.sectionId}/tags/${tag.tagId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )
      if (!res.ok) {
        throw new Error('Ошибка при удалении тега с секции на сервере')
      } else dispatch(getSections())
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [],
    isLoading: false,
    error: null,
  } as SectionsSliceState,
  reducers: {
    // createSection: (state, action: PayloadAction<Section>) => {
    //   state.sections.push(action.payload)
    // },
    // removeSection: (state, action: PayloadAction<Section>) => {
    //   state.sections = state.sections.filter(
    //     (e) => e.sectionId !== action.payload.sectionId
    //   )
    // },
    // addTag: (state, action: PayloadAction<ActionPayload>) => {
    //   const sectionToEdit = state.sections.find(
    //     (e) => e.sectionId === action.payload.section.sectionId
    //   ) as Section
    //   sectionToEdit.tags.push(action.payload.tag)
    // },
    // deleteTag: (state, action: PayloadAction<ActionPayload>) => {
    //   const sectionToEdit = state.sections.find(
    //     (e) => e.sectionId === action.payload.section.sectionId
    //   ) as Section
    //   sectionToEdit.tags = sectionToEdit.tags.filter(
    //     (e) => e.tagId !== action.payload.tag.tagId
    //   )
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSections.pending, (state) => {
        setPending(state)
      })
      .addCase(getSections.fulfilled, (state, action) => {
        setFulfilled(state)
        state.sections = action.payload
      })
      .addCase(getSections.rejected, (state, action) => {
        setRejected(state, action)
      })
      .addCase(createNewSection.pending, (state) => {
        setPending(state)
      })
      .addCase(createNewSection.rejected, (state, action) => {
        setRejected(state, action)
      })
      .addCase(createNewSection.fulfilled, (state) => {
        setFulfilled(state)
      })
      .addCase(deleteSection.pending, (state) => {
        setPending(state)
      })
      .addCase(deleteSection.rejected, (state, action) => {
        setRejected(state, action)
      })
      .addCase(deleteSection.fulfilled, (state) => {
        setFulfilled(state)
      })
      .addCase(addTagToSection.pending, (state) => {
        setPending(state)
      })
      .addCase(addTagToSection.rejected, (state, action) => {
        setRejected(state, action)
      })
      .addCase(addTagToSection.fulfilled, (state) => {
        setFulfilled(state)
      })
      .addCase(removeTagFromSection.pending, (state) => {
        setPending(state)
      })
      .addCase(removeTagFromSection.rejected, (state, action) => {
        setRejected(state, action)
      })
      .addCase(removeTagFromSection.fulfilled, (state) => {
        setFulfilled(state)
      })
      .addCase(renameSection.pending, (state) => {
        setPending(state)
      })
      .addCase(renameSection.rejected, (state, action) => {
        setRejected(state, action)
      })
      .addCase(renameSection.fulfilled, (state) => {
        setFulfilled(state)
      })
  },
})
// export const { addTag, deleteTag, createSection, removeSection } =
//   sectionsSlice.actions

export default sectionsSlice.reducer

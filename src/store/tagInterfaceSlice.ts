import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGetTags = createAsyncThunk('tag/getTags', async () => {
  const res = await fetch(`http://localhost:5000/tags`)
  return res.json()
})

export const fetchPostTag = createAsyncThunk('tag/postTag', async () => {})

export interface Tag {
  tag: string
  tagId: number
}

interface TagsState {
  tags: Array<Tag>
  addedTags: Array<Tag>
  status: string
  error: string | null
}

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    addedTags: [],
    status: '',
    error: null,
  } as TagsState,
  reducers: {
    addTag: (state, action) => {
      const newTag = action.payload
      state.addedTags.push(newTag)
      const filtered = state.tags.filter((tag) => tag.tagId !== newTag.tagId)
      state.tags = filtered
    },
    deleteTag: (state, action) => {
      const newAddedTags = state.addedTags.filter((t) => {
        return t.tagId !== action.payload.tagId
      })
      state.addedTags = newAddedTags
      state.tags.push(action.payload)
    },
    createNewTag: (state, action) => {
      const newTag = action.payload
      state.addedTags.push(newTag)
    },
    changeTagName: (state, action) => {
      const changed = state.tags.map((tag) => {
        console.log(tag)
        if (tag.tagId === action.payload.tagId) {
          tag.tag = action.payload.tag
        }
      })
      console.log(changed)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTags.pending, (state) => {
        state.error = null
        state.status = 'pending'
      })
      .addCase(fetchGetTags.fulfilled, (state, action) => {
        state.error = null
        state.status = 'fulfilled'
        state.tags = action.payload
      })
      .addCase(fetchGetTags.rejected, (state, action) => {})
  },
})
export const { addTag, deleteTag, createNewTag, changeTagName } =
  tagSlice.actions
export default tagSlice.reducer

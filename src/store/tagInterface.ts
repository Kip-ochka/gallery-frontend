import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import { IPostTag, ITag, ITagsState, IToAttacth } from '../types/models'

export const fetchGetTags = createAsyncThunk('tag/getTags', async () => {
  const res = await fetch(`http://localhost:5000/tags`)
  return res.json()
})

export const fetchPostTag = createAsyncThunk<ITag, IPostTag>(
  'tag/postTag',
  async ({ token, name }) => {
    if (typeof token === 'string') {
      const res = await fetch(`http://localhost:5000/tags?tag_name=${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      })
      if (res.ok) {
        const data = await res.json()
        return { tag: name, tagId: data.tagId }
      } else {
        throw new Error(res.statusText)
      }
    } else {
      throw new Error('Нет токена')
    }
  }
)

export const attachTag = createAsyncThunk(
  'tag/attachTag',
  async ({ path, itemId, tagId, token }: IToAttacth) => {
    const pathItem = path.slice(0, -1)
    const response = await fetch(
      `http://localhost:5000/${path}/${itemId}/tags/${tagId}?${pathItem}Id=${itemId}&tagId=${tagId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      }
    )
    if (response.ok) {
      return 'Тег успешно добавлен!'
    } else {
      throw new Error(response.statusText)
    }
  }
)

const tagInterface = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    addedTags: [],
    loading: false,
    error: null,
  } as ITagsState,
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
        if (tag.tagId === action.payload.tagId) {
          tag.tag = action.payload.tag
        }
      })
    },
    deleteAfterAttach: (state) => {
      state.addedTags = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTags.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchGetTags.fulfilled, (state, action) => {
        state.error = null
        state.loading = false
        state.tags = action.payload
      })
      .addCase(fetchGetTags.rejected, (state, action) => {
        state.loading = false
        state.error = `${action.error.name}: ${action.error.message}`
      })
      .addCase(fetchPostTag.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchPostTag.fulfilled, (state, action) => {
        const newTag = action.payload
        state.tags.push(newTag)
        state.error = null
        state.loading = false
      })
      .addCase(fetchPostTag.rejected, (state, action) => {
        state.error = `${action.error.name}: ${action.error.message}`
        state.loading = false
      })
      .addCase(attachTag.pending, (state, action) => {})
      .addCase(attachTag.fulfilled, (state, action) => {})
      .addCase(attachTag.rejected, (state, action) => {})
  },
})
export const {
  addTag,
  deleteTag,
  createNewTag,
  changeTagName,
  deleteAfterAttach,
} = tagInterface.actions
export default tagInterface.reducer

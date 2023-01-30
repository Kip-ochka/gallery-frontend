import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IPostTag, ITag, ITagsState, IToAttacth } from '../types/models'
import { BASE_URL } from '../utils/constants'

export const fetchGetTags = createAsyncThunk('tag/getTags', async () => {
  const res = await fetch(`${BASE_URL}tags`)
  return res.json()
})

export const fetchPostTag = createAsyncThunk<ITag, IPostTag>(
  'tag/postTag',
  async ({ token, name }) => {
    if (typeof token === 'string') {
      const res = await fetch(`${BASE_URL}tags?tag_name=${name}`, {
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

export const fetchDeleteTag = createAsyncThunk(
  'tag/deleteTag',
  async (arg: { token: string; tagId: number; tag: string }) => {
    const res = await fetch(`${BASE_URL}tags/${arg.tagId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: arg.token }),
    })
    if (res.ok) {
      return { tag: arg.tag, tagId: arg.tagId }
    } else {
      throw new Error(res.statusText)
    }
  }
)

export const fetchChangeTag = createAsyncThunk(
  'tag/changeTag',
  async (arg: { token: string; tagId: number; tag: string }) => {
    const res = await fetch(
      `${BASE_URL}tags/${arg.tagId}?edited_name=${arg.tag}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: arg.token }),
      }
    )
    if (res.ok) {
      return { tagId: arg.tagId, tag: arg.tag }
    } else {
      throw new Error(res.statusText)
    }
  }
)

export const attachTag = createAsyncThunk(
  'tag/attachTag',
  async ({ path, itemId, tagId, token }: IToAttacth) => {
    const pathItem = path.slice(0, -1)
    const response = await fetch(
      `${BASE_URL}${path}/${itemId}/tags/${tagId}?${pathItem}Id=${itemId}&tagId=${tagId}`,
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
    tagsToAdd: [],
    addedTags: [],
    loading: false,
    error: null,
  } as ITagsState,
  reducers: {
    addTagToAdded: (state, action) => {
      const newTag = action.payload
      state.addedTags.push(newTag)
      const filtered = state.tagsToAdd.filter(
        (tag) => tag.tagId !== newTag.tagId
      )
      state.tagsToAdd = filtered
    },
    removeTagFromAdded: (state, action) => {
      const newAddedTags = state.addedTags.filter((t) => {
        return t.tagId !== action.payload.tagId
      })
      state.addedTags = newAddedTags
      state.tagsToAdd.push(action.payload)
    },
    refreshTagsAfterAdding: (state) => {
      state.tagsToAdd = state.tags
      state.addedTags = []
    },
    createNewTag: (state, action) => {
      const newTag = action.payload
      state.addedTags.push(newTag)
    },
    deleteAfterAttach: (state) => {
      state.addedTags = []
    },
    removeTagAfterFetchDelete: (state, action) => {
      const removeTag = action.payload
      const filtered = state.tags.filter((tag) => {
        return tag.tagId !== removeTag.tagId
      })
      const filteredTagsToAdd = state.tagsToAdd.filter((tag) => {
        return tag.tagId !== removeTag.tagId
      })
      state.tags = filtered
      state.tagsToAdd = filteredTagsToAdd
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
        state.tagsToAdd = action.payload
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
        state.tagsToAdd.push(newTag)
        state.error = null
        state.loading = false
      })
      .addCase(fetchPostTag.rejected, (state, action) => {
        state.error = `${action.error.name}: ${action.error.message}`
        state.loading = false
      })
      .addCase(attachTag.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(attachTag.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(attachTag.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(fetchDeleteTag.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchDeleteTag.fulfilled, (state, action) => {
        state.error = null
        state.loading = false
        state.tags = state.tags.filter((e) => e.tagId !== action.payload.tagId)
      })
      .addCase(fetchDeleteTag.rejected, (state) => {
        state.loading = false
      })
      .addCase(fetchChangeTag.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchChangeTag.fulfilled, (state, action) => {
        state.error = null
        state.loading = false
        state.tags = state.tags.map((e) =>
          e.tagId === action.payload.tagId ? (e = action.payload) : e
        )
        state.tagsToAdd = state.tagsToAdd.map((e) =>
          e.tagId === action.payload.tagId ? (e = action.payload) : e
        )
      })
      .addCase(fetchChangeTag.rejected, (state) => {
        state.loading = false
      })
  },
})
export const {
  addTagToAdded,
  removeTagFromAdded,
  createNewTag,
  deleteAfterAttach,
  refreshTagsAfterAdding,
  removeTagAfterFetchDelete,
} = tagInterface.actions
export default tagInterface.reducer

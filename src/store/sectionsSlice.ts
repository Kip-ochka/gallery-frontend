import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Action } from '@remix-run/router'
import { ISection, ISectionsSliceState } from '../types/models'

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [
      {
        sectionId: 1,
        section: 'Пейзажи',
        tags: [
          {
            tagId: 1,
            tag: 'Закат',
          },
        ],
      },
      {
        sectionId: 2,
        section: 'Животные',
        tags: [
          {
            tagId: 2,
            tag: 'Белка',
          },
        ],
      },
      {
        sectionId: 3,
        section: 'Растения',
        tags: [
          {
            tagId: 3,
            tag: 'Цветы',
          },
        ],
      },
    ],
  } as ISectionsSliceState,
  reducers: {
    createNewSection: (state, action) => {
      state.sections.push(action.payload)
    },
    removeSection: (state, action) => {
      state.sections = state.sections.filter(
        (e) => e.sectionId !== action.payload.sectionId
      )
    },
    addTag: (state, action) => {
      const sectionToEdit = state.sections.find(
        (e) => e.sectionId === action.payload.section.sectionId
      ) as ISection
      sectionToEdit.tags.push(action.payload.tag)
    },
    deleteTag: (state, action) => {
      const sectionToEdit = state.sections.find(
        (e) => e.sectionId === action.payload.section.sectionId
      ) as ISection
      sectionToEdit.tags = sectionToEdit.tags.filter(
        (e) => e.tagId !== action.payload.tag.tagId
      )
    },
  },
})
export const { addTag, deleteTag, createNewSection, removeSection } =
  sectionsSlice.actions

export default sectionsSlice.reducer

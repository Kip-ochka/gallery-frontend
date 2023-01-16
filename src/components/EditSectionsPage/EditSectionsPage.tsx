import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import SectionItem from '../SectionItem/SectionItem'
import './EditSectionsPage.scss'
import { createNewSection } from '../../store/sectionsSlice'
import { useState } from 'react'
import { fetchPostTag } from '../../store/tagInterface'

export default function EditSectionsPage() {
  const { sections } = useAppSelector((state) => state.sections)
  const { tags } = useAppSelector((state) => state.tagInterface)
  const token = localStorage.getItem('token')
  const [newSectionName, setNewSectionName] = useState('')
  const [newTagName, setNewTagName] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="edit-sections-page__add-item-container">
        <div className="edit-sections-page__add-item-block">
          <input
            minLength={1}
            maxLength={30}
            className="edit-sections-page__input"
            type="text"
            name="newSectionName"
            id="newSectionName"
            value={newSectionName}
            onChange={(e) => {
              setNewSectionName(e.target.value)
            }}
            placeholder="Введите секцию"
          />
          <button
            className="edit-sections-page__add-item-btn"
            onClick={() => {
              if (!token) return
              const matched = sections.filter((section) => {
                return section.section === newSectionName
              })
              if (matched.length !== 1 && newSectionName.length > 0) {
                dispatch(createNewSection({ newSectionName, token }))
                setNewSectionName('')
              }
            }}
          >
            Добавить секцию
          </button>
        </div>
        <div className="edit-sections-page__add-item-block">
          <input
            minLength={1}
            maxLength={30}
            placeholder="Введите тег"
            className="edit-sections-page__input"
            type="text"
            name="newTagName"
            id="newTagName"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
          <button
            className="edit-sections-page__add-item-btn"
            onClick={() => {
              if (!token) return
              const matched = tags.filter((tag) => {
                return tag.tag === newTagName
              })
              if (matched.length !== 1 && newTagName.length > 0) {
                dispatch(fetchPostTag({ token, name: newTagName }))
                setNewTagName('')
              }
            }}
          >
            Добавить тег
          </button>
        </div>
      </div>
      <ul className="edit-sections-page">
        {sections.map((e) => (
          <SectionItem sectionItem={e} key={e.sectionId} />
        ))}
      </ul>
    </div>
  )
}

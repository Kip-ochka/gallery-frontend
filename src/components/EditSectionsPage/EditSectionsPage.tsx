import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import SectionItem from '../SectionItem/SectionItem'
import './EditSectionsPage.scss'
import { createNewSection } from '../../store/sectionsSlice'
import { useState } from 'react'
export default function EditSectionsPage() {
  const { sections } = useAppSelector((state) => state.sections)
  const { token } = useAppSelector((state) => state.admin)
  const [newSectionName, setNewSectionName] = useState('')
  const [newTagName, setNewTagName] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className='edit-sections-page__add-item-container'>
        <div className='edit-sections-page__add-item-block'>
          <input
            className='edit-sections-page__input'
            type='text'
            name='newSectionName'
            id='newSectionName'
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            placeholder='Введите секцию'
          />
          <button
            className='edit-sections-page__add-item-btn'
            onClick={() => {
              if (!token) return
              dispatch(createNewSection({ newSectionName, token }))
              setNewSectionName('')
            }}
          >
            Добавить секцию
          </button>
        </div>
        <div className='edit-sections-page__add-item-block'>
          <input
            placeholder='Введите тег'
            className='edit-sections-page__input'
            type='text'
            name='newTagName'
            id='newTagName'
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
          <button
            className='edit-sections-page__add-item-btn'
            onClick={() => {}}
          >
            Добавить тег
          </button>
        </div>
      </div>
      <ul className='edit-sections-page'>
        {sections.map((e) => (
          <SectionItem sectionItem={e} key={e.sectionId} />
        ))}
      </ul>
    </div>
  )
}

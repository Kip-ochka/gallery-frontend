import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import SectionItem from '../SectionItem/SectionItem'
import './EditSectionsPage.scss'
import { createNewSection } from '../../store/sectionsSlice'
import { useState } from 'react'
export default function EditSectionsPage() {
  const { sections } = useAppSelector((state) => state.sections)
  const { token } = useAppSelector((state) => state.admin)
  const [newSectionName, setNewSectionName] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className='edit-sections-page__add-section-block'>
        <input
          className='edit-sections-page__input'
          type='text'
          name='newSectionName'
          id='newSectionName'
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
        />
        <button
          className='edit-sections-page__add-section-btn'
          onClick={() => {
            if (token) {
              dispatch(createNewSection({ newSectionName, token }))
            }
          }}
        >
          Добавить секцию
        </button>
      </div>
      <ul className='edit-sections-page'>
        {sections.map((e) => (
          <SectionItem sectionItem={e} key={e.sectionId} />
        ))}
      </ul>
    </div>
  )
}

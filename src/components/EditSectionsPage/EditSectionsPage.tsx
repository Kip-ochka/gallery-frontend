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
      <ul className='edit-page'>
        {sections.map((e) => (
          <SectionItem sectionItem={e} key={e.sectionId} />
        ))}
      </ul>
      <input
        style={{ border: '1px solid black', margin: '20px' }}
        type='text'
        name='newSectionName'
        id='newSectionName'
        value={newSectionName}
        onChange={(e) => setNewSectionName(e.target.value)}
      />
      <button
        onClick={() => {
          if (token) {
            dispatch(createNewSection({ newSectionName, token }))
          }
        }}
      >
        Добавить секцию
      </button>
    </div>
  )
}

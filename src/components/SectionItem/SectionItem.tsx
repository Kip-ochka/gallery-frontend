import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './SectionItem.scss'
import testApi from '../../testapi/testapi'
import removeButtonIcon from '../../img/remove-icon.png'
import { Section } from '../../types/models'

export default function SectionItem(props: Section) {
  const { section, sectionId } = props
  const [currentSectionText, setCurrentSectionText] = useState<string>(section)
  const [editMode, setEditMode] = useState(false)
  const { token } = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch()

  return (
    <li className='section-item'>
      {editMode ? (
        <input
          autoFocus
          type='text'
          className='section-item__input'
          value={currentSectionText}
          onChange={(e) => setCurrentSectionText(e.target.value)}
          onBlur={() => {
            setEditMode(false)
          }}
        />
      ) : (
        <span
          className='section-item__text'
          onDoubleClick={() => setEditMode(true)}
        >
          {section}
        </span>
      )}
      <button className='section-item__remove-button' onClick={() => null}>
        <img
          src={removeButtonIcon}
          alt='удалить тег. Автор Andrean Prabowo'
          className='section-item__remove-button-icon'
        />
      </button>
    </li>
  )
}

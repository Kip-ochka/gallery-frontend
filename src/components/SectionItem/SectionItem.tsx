import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './SectionItem.scss'
import removeButtonIcon from '../../img/remove-icon.png'
import { ITag, Section } from '../../types/models'
import {
  renameSection,
  deleteSection,
  addTagToSection,
  removeTagFromSection,
} from '../../store/sectionsSlice'

export default function SectionItem(props: { sectionItem: Section }) {
  const { sectionItem } = props
  const { section, sectionId } = sectionItem
  const [currentSectionName, setCurrentSectionName] = useState<string>(section)
  const [editMode, setEditMode] = useState(false)
  const { token } = useAppSelector((state) => state.admin)
  const { tags } = useAppSelector((state) => state.tagInterface)
  const dispatch = useAppDispatch()

  const availiableTags = tags.filter(
    (a) => !sectionItem.tags.some((b) => b.tagId === a.tagId)
  )

  const submitAddTag = (e: { target: { value: string } }) => {
    const tag = tags.find((t) => t.tag === e.target.value)
    if (!tag || !token) return
    dispatch(addTagToSection({ section: sectionItem, tag, token }))
    e.target.value = ''
  }

  const submitRemoveTag = (t: ITag) => {
    if (!token) return
    dispatch(removeTagFromSection({ section: sectionItem, tag: t, token }))
  }

  return (
    <li className='section-item'>
      {editMode ? (
        <input
          autoFocus
          type='text'
          className='section-item__input'
          value={currentSectionName}
          onChange={(e) => setCurrentSectionName(e.target.value)}
          onBlur={() => {
            if (!token) return
            dispatch(
              renameSection({
                section: sectionItem,
                newName: currentSectionName,
                token,
              })
            )
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
      <button
        className='section-item__remove-button'
        onClick={() => {
          if (!token) return
          dispatch(deleteSection({ section: sectionItem, token }))
        }}
      >
        <img
          src={removeButtonIcon}
          alt='удалить тег. Автор Andrean Prabowo'
          className='section-item__remove-button-icon'
        />
      </button>
      {sectionItem.tags.map((t) => (
        <div key={t.tagId}>
          <p>{t.tag}</p>
          <button onClick={() => submitRemoveTag(t)}>X</button>
        </div>
      ))}
      {availiableTags.length > 0 ? (
        <select onChange={submitAddTag}>
          <option value=''>Выберите тег</option>
          {availiableTags.map((e) => (
            <option value={e.tag} key={e.tagId}>
              {e.tag}
            </option>
          ))}
        </select>
      ) : (
        <p>Нет доступных тегов</p>
      )}
    </li>
  )
}

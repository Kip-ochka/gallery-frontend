import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './SectionItem.scss'
import removeButtonIcon from '../../img/remove-icon.png'
import { ITag, Section } from '../../types/models'
import {
  renameSection,
  deleteSection,
  addTagToSection,
  removeTagFromSection,
  getSections,
} from '../../store/sectionsSlice'
import TagItem from '../TagItem/TagItem'
import AddTag from '../AddTag/AddTag'

export default function SectionItem(props: { sectionItem: Section }) {
  const { sectionItem } = props
  const { section, sectionId } = sectionItem
  const [currentSectionName, setCurrentSectionName] = useState<string>(section)
  const [editMode, setEditMode] = useState(false)
  const { tags } = useAppSelector((state) => state.tagInterface)
  const dispatch = useAppDispatch()
  const [rerender, setRerender] = useState(false)
  const token = localStorage.getItem('token')
  useEffect(() => {
    dispatch(getSections())
  }, [tags])

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
    <li className="section-item">
      <div className="section-item__container section-item__container_type_heading">
        {editMode ? (
          <input
            autoFocus
            type="text"
            className="section-item__input"
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
            className="section-item__title"
            onDoubleClick={() => setEditMode(true)}
          >
            {section}
          </span>
        )}
        <button
          className="section-item__remove-button"
          onClick={() => {
            if (!token) return
            dispatch(deleteSection({ section: sectionItem, token }))
          }}
        >
          <img
            src={removeButtonIcon}
            alt="удалить тег. Автор Andrean Prabowo"
            className="section-item__remove-button-icon"
          />
        </button>
      </div>
      <ul className="section-item__tag-list">
        {sectionItem.tags.map((t, i) => (
          <TagItem
            tagItem={t}
            onremoveTag={submitRemoveTag}
            odd={!!(i % 2)}
            key={t.tagId}
          />
        ))}
      </ul>
      <div className="section-item__container section-item__container_type_bottom">
        <AddTag availiableTags={availiableTags} onChange={submitAddTag} />
      </div>
    </li>
  )
}

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './TagItem.scss'
import removeButtonIcon from '../../img/remove-tag.png'
import detachTagIcon from '../../img/detach-tag.png'
import { ITag } from '../../types/models'
import { fetchChangeTag, fetchDeleteTag } from '../../store/tagInterface'

type TagItemProps = {
  tagItem: ITag
  onRemoveTag: (tagItem: ITag) => void
  odd?: boolean
}

export default function TagItem(props: TagItemProps) {
  const { tags } = useAppSelector((state) => state.tagInterface)
  const { tagItem, onRemoveTag, odd } = props
  const { tag, tagId } = tagItem
  const [currentTagText, setCurrentTagText] = useState<string>(tag)
  const [editMode, setEditMode] = useState(false)
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()

  return (
    <li className={`tag-item ${odd && 'tag-item_type_odd'}`}>
      {editMode ? (
        <input
          autoFocus
          type="text"
          className="tag-item__input"
          value={currentTagText}
          onChange={(e) => setCurrentTagText(e.target.value)}
          onBlur={() => {
            if (!token) return
            const matched = tags.filter((tag) => {
              return tag.tag === currentTagText
            })
            if (matched.length !== 1 && currentTagText.trim().length > 0) {
              const obj = { token: token, tagId, tag: currentTagText }
              dispatch(fetchChangeTag(obj))
              setEditMode(false)
            }
          }}
        />
      ) : (
        <span
          className="tag-item__text"
          onDoubleClick={() => setEditMode(true)}
        >
          {tag}
        </span>
      )}
      <div className="tag-item__btn-block">
        <button
          className="tag-item__remove-button"
          onClick={() => {
            onRemoveTag(tagItem)
          }}
        >
          <img
            src={detachTagIcon}
            alt="удалить тег. Автор Andrean Prabowo"
            className="tag-item__detach-button-icon"
          />
        </button>
        <button
          className="tag-item__remove-button"
          onClick={() => {
            if (!token) return
            dispatch(fetchDeleteTag({ token, tagId, tag }))
          }}
        >
          <img
            src={removeButtonIcon}
            alt="удалить тег. Автор Andrean Prabowo"
            className="tag-item__remove-button-icon"
          />
        </button>
      </div>
    </li>
  )
}

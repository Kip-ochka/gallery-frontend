import { useState } from 'react'
import { changeTagName } from '../../store/tagInterface'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './TagItem.scss'
import testApi from '../../testapi/testapi'
import removeButtonIcon from '../../img/remove-icon.png'
import { ITag } from '../../types/models'

export default function TagItem(props: ITag) {
  const { tag, tagId } = props
  const [currentTagText, setCurrentTagText] = useState<string>(tag)
  const [editMode, setEditMode] = useState(false)
  const { token } = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch()

  return (
    <li className="tag-item">
      {editMode ? (
        <input
          autoFocus
          type="text"
          className="tag-item__input"
          value={currentTagText}
          onChange={(e) => setCurrentTagText(e.target.value)}
          onBlur={() => {
            console.log(currentTagText)

            testApi.renameTag(tagId, currentTagText, token).then((res) => {
              if (res === null) {
                dispatch(changeTagName({ tag: currentTagText, tagId }))
              }
            })

            setEditMode(false)
            console.log(currentTagText)
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
      <button
        className="tag-item__remove-button"
        onClick={() => testApi.removeTag(tagId, token).then((res) => {})}
      >
        <img
          src={removeButtonIcon}
          alt="удалить тег. Автор Andrean Prabowo"
          className="tag-item__remove-button-icon"
        />
      </button>
    </li>
  )
}

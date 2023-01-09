import { useState } from 'react'
import { deleteTag, changeTagName } from '../../store/tagInterfaceSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './TagSectionItem.scss'

interface TagItemProps {
  tag: string
  tagId: number
}

export default function TagItem(props: TagItemProps) {
  const { tag, tagId } = props
  const [currentTagText, setCurrentTagText] = useState<string>(tag)
  const [editMode, setEditMode] = useState(false)

  const dispatch = useAppDispatch()

  return (
    <li className='item'>
      {editMode ? (
        <input
          autoFocus
          type='text'
          className='item__input'
          value={currentTagText}
          onChange={(e) => setCurrentTagText(e.target.value)}
          onBlur={() => {
            dispatch(changeTagName({ tag, tagId }))
            setEditMode(false)
          }}
        />
      ) : (
        <span className='item__text' onDoubleClick={() => setEditMode(true)}>
          {tag}
        </span>
      )}
    </li>
  )
}

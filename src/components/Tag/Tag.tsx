import { useState } from 'react'
import './Tag.scss'
import { addTag, deleteTag, changeTagName } from '../../store/tagInterface'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'

interface TagProps {
  tag: string
  tagId?: number
}

function Tag({ tagId, tag }: TagProps) {
  const [redactable, setRedactable] = useState(false)
  const [textContent, setTextContent] = useState(tag)
  const dispatch = useAppDispatch()
  const tagState = useAppSelector((state) => state.tagInterface)
  return (
    <li key={tagId} className="tag">
      <input
        className="tag_input"
        type="text"
        value={textContent}
        onChange={(e) => {
          setTextContent(e.currentTarget.value)
        }}
        disabled={redactable ? false : true}
      />
    </li>
  )
}

export default Tag

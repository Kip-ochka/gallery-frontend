import { useState } from 'react'
import './Tag.scss'
import { addTag, deleteTag, changeTagName } from '../../store/tagInterface'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { ITag } from '../../types/models'

function Tag({ tagId, tag }: ITag) {
  const [redactable, setRedactable] = useState(false)
  const [textContent, setTextContent] = useState(tag)
  const dispatch = useAppDispatch()
  const tagState = useAppSelector((state) => state.tagInterface)
  return (
    <li
      key={tagId}
      className="tag"
      onClick={() => {
        dispatch(addTag({ tagId: tagId, tag: textContent }))
      }}
    >
      <p>{textContent}</p>
    </li>
  )
}

export default Tag

//<input
//        className="tag_input"
//        type="text"
//        value={textContent}
//        onChange={(e) => {
//          setTextContent(e.currentTarget.value)
//        }}
//        disabled={redactable ? false : true}
//      />

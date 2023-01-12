import { useState } from 'react'
import './Tag.scss'
import { ITagProps } from '../../types/models'

function Tag({ tagId, tag, onClick }: ITagProps) {
  const [redactable, setRedactable] = useState(false)
  const [textContent, setTextContent] = useState(tag)
  return (
    <li key={tagId} className="tag">
      <p
        className="tag__name"
        onClick={() => {
          onClick({ tagId: tagId, tag: tag })
        }}
      >
        {textContent}
      </p>
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

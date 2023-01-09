import { useState } from 'react'
import { addTag, deleteTag, changeTagName } from '../../store/tagInterfaceSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
interface TagProps {
  tag: string
  tagId?: number

  type: string
}
function Tag({ tagId, tag, type }: TagProps) {
  const [redactable, setRedactable] = useState(false)
  const [textContent, setTextContent] = useState(tag)
  const dispatch = useAppDispatch()
  const tagState = useAppSelector((state) => state.tag)
  return (
    <li key={tagId}>
      <input
        type='text'
        value={textContent}
        onChange={(e) => {
          setTextContent(e.currentTarget.value)
        }}
        disabled={redactable ? false : true}
      />
      {type === 'toNewImg' && (
        <button
          onClick={() => {
            dispatch(addTag({ tagId, tag }))
          }}
        >
          +
        </button>
      )}
      {type === 'fromNewImg' && (
        <button
          onClick={() => {
            dispatch(deleteTag({ tagId, tag }))
          }}
        >
          -
        </button>
      )}
      {redactable ? (
        <button
          onClick={() => {
            setRedactable((v) => !v)
            dispatch(changeTagName({ tagId, tag }))
          }}
        >
          SAVE
        </button>
      ) : (
        <button
          onClick={() => {
            setRedactable((v) => !v)
          }}
        >
          ред
        </button>
      )}
    </li>
  )
}

export default Tag

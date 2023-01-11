import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import Tag from '../Tag/Tag'
import './TagInterface.scss'
import plusIcon from '../../img/plus.svg'
import saveIcon from '../../img/save.svg'
import cancelIcon from '../../img/cancel.svg'
import { useState } from 'react'
import { fetchPostTag } from '../../store/tagInterface'
import { unwrapResult } from '@reduxjs/toolkit'
interface Tag {
  tag: string
  tagId: number
}

function TagInterface() {
  const [isCreateNewTag, setIsCreateNewTag] = useState(false)
  const [textValue, setTextValue] = useState('')
  const dispatch = useAppDispatch()
  const { tags, addedTags, loading, error } = useAppSelector(
    (state) => state.tagInterface
  )
  const { token } = useAppSelector((state) => state.admin)

  return (
    <div className="tags">
      <div className="tags__new-tag-wrapper">
        <button
          className="tags__new-tag-button"
          onClick={() => {
            setIsCreateNewTag((v) => !v)
          }}
        >
          Создать новый тег
          <img src={plusIcon} />
        </button>
        {isCreateNewTag ? (
          <div className="tags__input-wrapper">
            <input
              type="text"
              className={`tags__new-tag-input ${
                error ? 'tags__new-tag-input_error' : ''
              }`}
              placeholder="Название тега..."
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value)
              }}
            />
            <div className="tags__buttons-wrapper">
              <button
                className="tags__button-icon tags__button-icon_save"
                onClick={async (e) => {
                  e.preventDefault()
                  const obj = { token: token, name: textValue }
                  await dispatch(fetchPostTag(obj)).then(unwrapResult)
                }}
              >
                <img src={saveIcon} />
              </button>
              <button
                className="tags__button-icon tags__button-icon_cancel"
                onClick={() => {
                  setTextValue('')
                  setIsCreateNewTag(false)
                }}
              >
                <img src={cancelIcon} />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <ul className="tags__list">
        {loading ? (
          <p>Preloader</p>
        ) : (
          tags.map((item: Tag) => {
            return <Tag key={item.tagId} tag={item.tag} tagId={item.tagId} />
          })
        )}
      </ul>
      <ul className="tags__added-list">
        {addedTags.map((item: Tag) => {
          return <Tag key={item.tagId} tag={item.tag} tagId={item.tagId} />
        })}
      </ul>
    </div>
  )
}

export default TagInterface

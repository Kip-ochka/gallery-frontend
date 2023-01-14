import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import Tag from '../Tag/Tag'
import './TagInterface.scss'
import plusIcon from '../../img/plus.svg'
import saveIcon from '../../img/save.svg'
import cancelIcon from '../../img/cancel.svg'
import { useState } from 'react'
import { fetchPostTag } from '../../store/tagInterface'
import { unwrapResult } from '@reduxjs/toolkit'
import { addTagToAdded, removeTagFromAdded } from '../../store/tagInterface'
import { ITag } from '../../types/models'

function TagInterface() {
  const [isCreateNewTag, setIsCreateNewTag] = useState(false)
  const [textValue, setTextValue] = useState('')
  const dispatch = useAppDispatch()
  const { tagsToAdd, addedTags, loading, error, tags } = useAppSelector(
    (state) => state.tagInterface
  )
  const { token } = useAppSelector((state) => state.admin)

  const moveTagToAdded = (tag: ITag) => {
    dispatch(addTagToAdded(tag))
  }
  const deleteTagFromAdded = (tag: ITag) => {
    dispatch(removeTagFromAdded(tag))
  }
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
              minLength={1}
              maxLength={30}
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
                  const matched = tags.filter((tag) => {
                    return tag.tag === textValue
                  })
                  console.log(matched)
                  if (matched.length !== 1 && textValue.length > 0) {
                    const obj = { token: token, name: textValue }
                    await dispatch(fetchPostTag(obj))
                      .then(unwrapResult)
                      .then(() => {
                        setTextValue('')
                      })
                  }
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
      <div className="tags__list-wrapper">
        <p className="tags__list-title">Все теги</p>
        <ul className="tags__list">
          {loading ? (
            <p>Preloader</p>
          ) : (
            tagsToAdd.map((item) => {
              return (
                <Tag
                  key={item.tagId}
                  tag={item.tag}
                  tagId={item.tagId}
                  onClick={moveTagToAdded}
                  type={'toAdd'}
                />
              )
            })
          )}
        </ul>
      </div>
      <div className="tags__list-wrapper">
        <p className="tags__list-title">Добавленные теги</p>
        <ul className="tags__list">
          {addedTags.map((item) => {
            return (
              <Tag
                key={item.tagId}
                tag={item.tag}
                tagId={item.tagId}
                onClick={deleteTagFromAdded}
                type={'toDeleteFromAdded'}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TagInterface

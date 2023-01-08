import { useEffect, useState } from 'react'
import { fetchGetTags } from '../../store/tagInterfaceSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import Tag from '../Tag/Tag'
import './TagInterface.scss'

interface Tag {
  tag: string
  tagId?: number
}

function TagInterface() {
  const dispatch = useAppDispatch()
  const { tags, addedTags, status, error } = useAppSelector(
    (state) => state.tag
  )

  useEffect(() => {
    dispatch(fetchGetTags())
  }, [dispatch])
  return (
    <div className="tags">
      <ul className="tags__list">
        {status === 'pending' ? (
          <p>Preloader</p>
        ) : (
          tags.map((item: Tag) => {
            return (
              <Tag
                key={item.tagId}
                tag={item.tag}
                tagId={item.tagId}
                type={'toNewImg'}
              />
            )
          })
        )}
      </ul>
      <ul className="tags__added-list">
        {addedTags.map((item: Tag) => {
          return (
            <Tag
              key={item.tagId}
              tag={item.tag}
              tagId={item.tagId}
              type={'fromNewImg'}
            />
          )
        })}
      </ul>
      <button>Создать новый тег</button>
    </div>
  )
}

export default TagInterface

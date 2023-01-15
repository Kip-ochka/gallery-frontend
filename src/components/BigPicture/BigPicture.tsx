import { IPhoto, ITag } from '../../types/models'
import { BIG_SIZE } from '../../utils/imageSizesLink'
import './BigPicture.scss'
import { useEffect, useState } from 'react'
import editIcon from '../../img/edit_icon.svg'
import removeIcon from '../../img/remove-icon.svg'
import { deleteImage, removeTagFromImage } from '../../store/imageSlice'
import { AppDispatch } from '../../store'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup'
import TagItem from '../TagItem/TagItem'
import AddTag from '../AddTag/AddTag'
import backIcon from '../../img/back_icon.svg'

type bigPictureProps = {
  onClose: () => void
  previewIndex: number
}

export default function BigPicture(props: bigPictureProps) {
  const { previewIndex, onClose } = props
  const [editMode, setEditMode] = useState(false)
  const [removeMode, setRemoveMode] = useState(false)
  const { token } = useAppSelector((state) => state.admin)
  const images = useAppSelector((state) => state.images)
  const tags = useAppSelector((state) => state.tagInterface.tags)
  const [currentIndex, setCurrentIndex] = useState(previewIndex)
  const photoToRender = images.images[currentIndex - 1]

  const dispatch = useAppDispatch()

  const decrementIndex = () => {
    if (currentIndex <= 1) return
    setCurrentIndex((prev) => prev - 1)
  }
  const incrementIndex = () => {
    if (currentIndex >= images.images.length) return
    setCurrentIndex((prev) => prev + 1)
  }
  const keyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      incrementIndex()
    } else if (e.key === 'ArrowLeft') {
      decrementIndex()
    }
  }
  useEffect(() => {
    document.addEventListener('keyup', keyNavigation)
    return () => {
      document.removeEventListener('keyup', keyNavigation)
    }
  }, [])

  const submitDelete = () => {
    if (!token) return
    dispatch(deleteImage({ image: photoToRender, token }))
    onClose()
  }
  const submitDeleteTag = (tag: ITag) => {
    if (!token) return
    dispatch(removeTagFromImage({ image: photoToRender, token, tag }))
  }

  return (
    <div className='big-picture'>
      {removeMode && (
        <ConfirmPopup
          onSubmit={submitDelete}
          onCancel={() => setRemoveMode(false)}
        />
      )}
      <button
        onClick={decrementIndex}
        className='big-picture__button big-picture__button_left'
      ></button>
      <div className='big-picture__photo-container'>
        {editMode && (
          <div className='big-picture__edit-container'>
            <p className='big-picture__edit-heading'>
              Список тегов на фотографии
            </p>
            {photoToRender.tags.map((t: ITag) => (
              <TagItem
                key={t.tagId}
                tagItem={t}
                onRemoveTag={submitDeleteTag}
              />
            ))}
            <AddTag
              availiableTags={tags ? tags : []}
              onChange={() => console.log('changed')}
            />
          </div>
        )}
        <div className='big-picture__buttons-container'>
          <button
            className='big-picture__edit-block-button big-picture__edit-block-button_type_edit'
            onClick={() => setEditMode(!editMode)}
          >
            <img
              src={editMode ? backIcon : editIcon}
              alt='Редактировать фотокарточку'
              className='big-picture__edit-block-icon'
            />
          </button>
          <button
            className='big-picture__edit-block-button big-picture__edit-block-button_type_remove'
            onClick={() => setRemoveMode(true)}
          >
            <img
              src={removeIcon}
              alt='Удалить фотокарточку'
              className='big-picture__edit-block-icon'
            />
          </button>
        </div>
        <img
          src={BIG_SIZE + photoToRender.image}
          alt='Фото.'
          className='big-picture__photo'
          onClick={onClose}
        />
      </div>
      <button
        className='big-picture__button big-picture__button_right'
        onClick={incrementIndex}
      ></button>
    </div>
  )
}

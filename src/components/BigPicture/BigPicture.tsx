import { IPhoto } from '../../types/models'
import { BIG_SIZE } from '../../utils/imageSizesLink'
import './BigPicture.scss'
import { useEffect, useState } from 'react'
import editIcon from '../../img/edit_icon.svg'
import removeIcon from '../../img/remove-icon.svg'
import { deleteImage } from '../../store/imageSlice'
import { AppDispatch } from '../../store'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup'

type bigPictureProps = {
  image: IPhoto
  onClose: () => void
  onDecrement: () => void
  onIncrement: () => void
}

export default function BigPicture(props: bigPictureProps) {
  const { image, onClose, onDecrement, onIncrement } = props
  const [editMode, setEditMode] = useState(false)
  const [removeMode, setRemoveMode] = useState(false)
  const { token } = useAppSelector((state) => state.admin)

  const dispatch = useAppDispatch()

  const keyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      onIncrement()
    } else if (e.key === 'ArrowLeft') {
      onDecrement()
    }
  }

  const submitDelete = () => {
    if (!token) return
    dispatch(deleteImage({ image, token }))
    onClose()
  }

  useEffect(() => {
    document.addEventListener('keyup', keyNavigation)
    return () => {
      document.removeEventListener('keyup', keyNavigation)
    }
  }, [])

  return (
    <div className="big-picture">
      {removeMode && (
        <ConfirmPopup
          onSubmit={submitDelete}
          onCancel={() => setRemoveMode(false)}
        />
      )}
      <button
        onClick={onDecrement}
        className="big-picture__button big-picture__button_left"
      ></button>
      <div className="big-picture__photo-container">
        <div className="big-picture__edit-container">
          <button
            className="big-picture__edit-block-button big-picture__edit-block-button_type_edit"
            onClick={() => setEditMode(true)}
          >
            <img
              src={editIcon}
              alt="Редактировать фотокарточку"
              className="big-picture__edit-block-icon"
            />
          </button>
          <button
            className="big-picture__edit-block-button big-picture__edit-block-button_type_remove"
            onClick={() => setRemoveMode(true)}
          >
            <img
              src={removeIcon}
              alt="Удалить фотокарточку"
              className="big-picture__edit-block-icon"
            />
          </button>
        </div>
        <img
          src={BIG_SIZE + image.image}
          alt="Фото."
          className="big-picture__photo"
          onClick={onClose}
        />
      </div>
      <button
        onClick={onIncrement}
        className="big-picture__button big-picture__button_right"
      ></button>
    </div>
  )
}

import { ITag } from '../../types/models'
import { BIG_SIZE } from '../../utils/imageSizesLink'
import './BigPicture.scss'
import { useEffect, useState } from 'react'
import editIcon from '../../img/edit_icon.svg'
import removeIcon from '../../img/remove-icon.svg'
import {
  addTagToImage,
  deleteImage,
  getImages,
  removeTagFromImage,
} from '../../store/imageSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup'
import TagItem from '../TagItem/TagItem'
import AddTag from '../AddTag/AddTag'
import backIcon from '../../img/back_icon.svg'
import { fetchPostTag } from '../../store/tagInterface'
import addIcon from '../../img/add-icon.svg'
import { useParams } from 'react-router'

type bigPictureProps = {
  onClose: () => void
  previewIndex: number
}

export default function BigPicture(props: bigPictureProps) {
  const { previewIndex, onClose } = props
  const [editMode, setEditMode] = useState(false)
  const [removeMode, setRemoveMode] = useState(false)
  const token = localStorage.getItem('token')
  const images = useAppSelector((state) => state.images)
  const tags = useAppSelector((state) => state.tagInterface.tags)
  const { isLogged } = useAppSelector((state) => state.admin)
  const [currentIndex, setCurrentIndex] = useState(previewIndex)
  const photoToRender = images.images[currentIndex - 1]
  const [newTagName, setNewTagName] = useState('')
  const { chosenSectionId } = useParams()

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
  }, [currentIndex])

  useEffect(() => {
    dispatch(getImages({ sectionId: chosenSectionId }))
  }, [tags, dispatch])

  useEffect(() => {
    setEditMode(false)
  }, [currentIndex])

  const submitDelete = () => {
    if (!token) return
    dispatch(deleteImage({ image: photoToRender, token }))
    onClose()
  }

  const submitDeleteTag = (tag: ITag) => {
    if (!token) return
    dispatch(removeTagFromImage({ image: photoToRender, token, tag }))
  }

  const submitAddTag = (e: { target: { value: string } }) => {
    const tag = tags.find((t) => t.tag === e.target.value)
    if (!tag || !token) return
    dispatch(addTagToImage({ image: photoToRender, tag, token }))
    e.target.value = ''
  }

  return (
    <div className="big-picture">
      {removeMode && (
        <ConfirmPopup
          onSubmit={submitDelete}
          onCancel={() => setRemoveMode(false)}
        />
      )}
      <button
        onClick={decrementIndex}
        className="big-picture__button big-picture__button_left"
      ></button>
      {editMode && (
        <div className="big-picture__edit-container">
          <p className="big-picture__edit-heading">Добавленные теги</p>
          {photoToRender.tags.map((t: ITag) => (
            <TagItem key={t.tagId} tagItem={t} onRemoveTag={submitDeleteTag} />
          ))}
          <AddTag
            availiableTags={tags.filter(
              (t) => !photoToRender.tags.some((tt) => tt.tagId === t.tagId)
            )}
            onChange={submitAddTag}
          />
          <div className="big-picture__add-tag-container">
            <input
              placeholder="Создать тег..."
              className="big-picture__add-tag-input"
              type="text"
              name="newTagName"
              id="newTagName"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <button
              className="big-picture__add-tag-btn"
              onClick={() => {
                if (!token) return
                dispatch(fetchPostTag({ token, name: newTagName }))
                setNewTagName('')
              }}
            >
              <img
                src={addIcon}
                alt="Добавить новый тег."
                className="big-picture__add-tag-btn-icon"
              />
            </button>
          </div>
        </div>
      )}
      {isLogged && (
        <div className="big-picture__buttons-container">
          <button
            className="big-picture__edit-block-button big-picture__edit-block-button_type_edit"
            onClick={() => {
              setEditMode(!editMode)
              setRemoveMode(false)
            }}
          >
            <img
              src={editMode ? backIcon : editIcon}
              alt="Редактировать фотокарточку"
              className="big-picture__edit-block-icon"
            />
          </button>
          <button
            className="big-picture__edit-block-button big-picture__edit-block-button_type_remove"
            onClick={() => {
              setRemoveMode(true)
              setEditMode(false)
            }}
          >
            <img
              src={removeIcon}
              alt="Удалить фотокарточку"
              className="big-picture__edit-block-icon"
            />
          </button>
        </div>
      )}
      <img
        src={BIG_SIZE + photoToRender.image}
        alt="Фото."
        className="big-picture__photo"
        onClick={onClose}
      />
      <button
        className="big-picture__button big-picture__button_right"
        onClick={incrementIndex}
      ></button>
    </div>
  )
}

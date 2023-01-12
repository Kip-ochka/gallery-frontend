import { useState } from 'react'
import { IPreviewImageProps } from '../../types/models'
import TagInterface from '../TagInterface/TagInterface'
import './PreviewImage.scss'

function PreviewImage({
  url,
  getFileName,
  setFile,
  onSubmit,
}: IPreviewImageProps) {
  return (
    <div className="preview">
      <div className="preview__img-wrapper">
        <img src={url} alt="asd" className="preview__image" />
        <p className="preview__image-name">{getFileName()}</p>
        <div className="preview__button-wrapper">
          <button
            className="preview__button preview__button_save"
            onClick={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            Сохранить
          </button>
          <button className="preview__button" onClick={() => setFile(null)}>
            Отмена
          </button>
        </div>
      </div>
      <TagInterface />
    </div>
  )
}

export default PreviewImage

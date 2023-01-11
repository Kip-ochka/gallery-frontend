import { useState } from 'react'
import TagInterface from '../TagInterface/TagInterface'
import './PreviewImage.scss'

interface PhotoFile {
  lastModified: number
  name: string
  size: string
  type: string
  webkitRelativePath: string
}

interface PreviewImageProps {
  url: string | undefined
  getFileName: () => string
  setFile: (arg: PhotoFile[] | null) => void
}

function PreviewImage({ url, getFileName, setFile }: PreviewImageProps) {
  return (
    <div className="preview">
      <div className="preview__img-wrapper">
        <img src={url} alt="asd" className="preview__image" />
        <p className="preview__image-name">{getFileName()}</p>
        <div className="preview__button-wrapper">
          <button
            className="preview__button preview__button_save"
            onClick={() => setFile(null)}
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

import { useState, useRef } from 'react'
import { IDragFileProps } from '../../types/models'
import './DragFile.scss'

function DragFile({ setFile, setFileUrl }: IDragFileProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = function (e: any) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = function (e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files)
      setFileUrl({ url: URL.createObjectURL(e.dataTransfer.files[0]) })
    }
  }

  const handleChange = function (e: any) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files)
      setFileUrl({ url: URL.createObjectURL(e.target.files[0]) })
    }
  }

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <form
      className="form"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        className="form__input"
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        className={`form__label${dragActive ? ' form__label_active' : ''}`}
        htmlFor="input-file-upload"
      >
        <div className="form__text-wrapper">
          <p className="form__description">Перетащите сюда файл или</p>
          <button className="form__button" onClick={onButtonClick}>
            нажмите сюда для загрузки
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          className="form__drag-zone"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  )
}

export default DragFile

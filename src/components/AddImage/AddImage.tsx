import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { addImage } from '../../store/imageSlice'
import { IFileUrl, IPhotoFile } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import DragFile from '../DragFile/DragFile'
import PreviewImage from '../PreviewImage/PreviewImage'
import './AddImage.scss'

function AddImage() {
  const [file, setFile] = useState<File[]>()
  const [fileUrl, setFileUrl] = useState<IFileUrl>({})
  const dispatch = useAppDispatch()
  const { addedTags } = useAppSelector((state) => state.tagInterface)
  const { token } = useAppSelector((state) => state.admin)
  const getFileName = () => {
    if (file) {
      return file[0].name
    } else {
      return ''
    }
  }

  const addImageToServer = () => {
    const toSend = file![0]
    if (typeof token === 'string') {
      dispatch(addImage({ path: 'images', toSend, addedTags, token }))
        .then(unwrapResult)
        .then((data) => {
          console.log(data)
          setFile(undefined)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="add-image">
      {file ? (
        <PreviewImage
          url={fileUrl.url}
          getFileName={getFileName}
          setFile={setFile}
          onSubmit={addImageToServer}
        />
      ) : (
        <DragFile setFile={setFile} setFileUrl={setFileUrl} />
      )}
    </div>
  )
}

export default AddImage

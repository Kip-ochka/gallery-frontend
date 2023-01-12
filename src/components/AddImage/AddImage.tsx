import { useState } from 'react'
import { IFileUrl, IPhotoFile } from '../../types/models'
import DragFile from '../DragFile/DragFile'
import PreviewImage from '../PreviewImage/PreviewImage'
import './AddImage.scss'

function AddImage() {
  const [file, setFile] = useState<null | IPhotoFile[]>(null)
  const [fileUrl, setFileUrl] = useState<IFileUrl>({})
  const getFileName = () => {
    if (file) {
      return file[0].name
    } else {
      return ''
    }
  }
  return (
    <div className="add-image">
      {file ? (
        <PreviewImage
          url={fileUrl.url}
          getFileName={getFileName}
          setFile={setFile}
        />
      ) : (
        <DragFile setFile={setFile} setFileUrl={setFileUrl} />
      )}
    </div>
  )
}

export default AddImage

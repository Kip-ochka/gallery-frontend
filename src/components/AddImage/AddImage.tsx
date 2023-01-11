import { useState } from 'react'
import DragFile from '../DragFile/DragFile'
import PreviewImage from '../PreviewImage/PreviewImage'
import './AddImage.scss'

interface PhotoFile {
  lastModified: number
  name: string
  size: string
  type: string
  webkitRelativePath: string
}

interface FileUrl {
  url?: string
}
function AddImage() {
  const [file, setFile] = useState<null | PhotoFile[]>(null)
  const [fileUrl, setFileUrl] = useState<FileUrl>({})
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

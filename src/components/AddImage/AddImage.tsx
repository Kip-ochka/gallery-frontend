import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { addImage } from '../../store/imageSlice'
import { attachTag, refreshTagsAfterAdding } from '../../store/tagInterface'
import { IFileUrl, ITag, IToAttacth } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import DragFile from '../DragFile/DragFile'
import PreviewImage from '../PreviewImage/PreviewImage'
import './AddImage.scss'

function AddImage() {
  const [file, setFile] = useState<File[]>()
  const [fileUrl, setFileUrl] = useState<IFileUrl>({})
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  const { addedTags } = useAppSelector((state) => state.tagInterface)
  const getFileName = () => {
    if (file) {
      return file[0].name
    } else {
      return ''
    }
  }

  const addImageToServer = () => {
    const toSend = file![0]
    if (typeof token === 'string' && token) {
      dispatch(addImage({ toSend }))
        .then(unwrapResult)
        .then(async (data) => {
          const allPromices = await returnTagsPromise(data.imageId)
          const checkPromices = allPromices?.filter((promice) => {
            return promice === 'Тег успешно добавлен!'
          })
          if (checkPromices?.length !== allPromices?.length) {
            console.log(
              'Один из тегов не добавился автоматически, проверьте в режиме просмотра фотографии!'
            )
          } else {
            dispatch(refreshTagsAfterAdding())
            setFile(undefined)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const returnTagsPromise = (imageId: number) => {
    if (typeof token === 'string' && token) {
      const allTags = addedTags.map(async (tag: ITag) => {
        const toAttacth = {
          path: 'images',
          itemId: imageId,
          tagId: tag.tagId,
          token,
        } as IToAttacth
        const added = await dispatch(attachTag(toAttacth)).unwrap()
        if (added) {
          return added
        } else {
          return new Error(`Не получилось добавить тег`)
        }
      })
      return Promise.all(allTags)
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

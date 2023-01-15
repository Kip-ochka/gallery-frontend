import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getImages } from '../../store/imageSlice'
import { IPhoto } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import BigPicture from '../BigPicture/BigPicture'
import PhotoCard from '../PhotoCard/PhotoCard'
import './PhotoGallery.scss'

function PhotoGallery() {
  const dispatch = useAppDispatch()
  const { images } = useAppSelector((state) => state.images)
  const { chosenSectionId } = useParams()
  const [previewIndex, setPreviewIndex] = useState<null | number>(null)

  useEffect(() => {
    dispatch(getImages({ sectionId: chosenSectionId }))
    setPreviewIndex(null)
  }, [chosenSectionId])

  return !previewIndex ? (
    <section className='photos'>
      {false ? (
        <div>Loading...</div>
      ) : (
        <ul className='photos__wrapper'>
          {images.map((image: IPhoto) => {
            return (
              <PhotoCard
                key={image.imageId}
                image={image.image}
                onClick={() => {
                  setPreviewIndex(images.indexOf(image) + 1)
                }}
              />
            )
          })}
        </ul>
      )}
    </section>
  ) : (
    <BigPicture
      previewIndex={previewIndex}
      onClose={() => setPreviewIndex(null)}
    />
  )
}

export default PhotoGallery

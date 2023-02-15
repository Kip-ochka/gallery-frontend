import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getImages } from '../../store/imageSlice'
import { IPhoto } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import BigPicture from '../BigPicture/BigPicture'
import PhotoCard from '../PhotoCard/PhotoCard'
import Preloader from '../Preloader/Preloader'
import './PhotoGallery.scss'

function PhotoGallery() {
  const dispatch = useAppDispatch()
  const { images, loading } = useAppSelector((state) => state.images)
  const { chosenSectionId } = useParams()
  const [previewIndex, setPreviewIndex] = useState<null | number>(null)

  useEffect(() => {
    dispatch(getImages({ sectionId: chosenSectionId }))
    setPreviewIndex(null)
  }, [chosenSectionId, dispatch])

  return images.length === 0 ? (
    <p className='photos__no-photo-message'>
      В этом разделе пока нет фотографий...
    </p>
  ) : !previewIndex ? (
    <section className='photos'>
      {loading ? (
        <div className='photos__preloader-wrapper'>
          <Preloader />
        </div>
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

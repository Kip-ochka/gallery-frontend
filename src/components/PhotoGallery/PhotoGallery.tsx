import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { chunkImages, getImages } from '../../store/imageSlice'
import { IPhoto } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import BigPicture from '../BigPicture/BigPicture'
import PhotoCard from '../PhotoCard/PhotoCard'
import Preloader from '../Preloader/Preloader'
import './PhotoGallery.scss'

function PhotoGallery() {
  const dispatch = useAppDispatch()
  const { images, loading, chunks } = useAppSelector((state) => state.images)
  const { chosenSectionId } = useParams()
  const [previewIndex, setPreviewIndex] = useState<null | number>(null)

  useEffect(() => {
    const width = window.innerWidth
    dispatch(getImages({ sectionId: chosenSectionId })).then(() => {
      dispatch(chunkImages(width))
    })
    setPreviewIndex(null)
  }, [chosenSectionId, dispatch])

  return images.length === 0 ? (
    <p className="photos__no-photo-message">
      В этом разделе пока нет фотографий...
    </p>
  ) : !previewIndex ? (
    <section className="photos">
      {loading ? (
        <div className="photos__preloader-wrapper">
          <Preloader />
        </div>
      ) : (
        <ul className="photos__wrapper">
          {chunks.map((list, index) => {
            return (
              <li key={index}>
                <ul className="photos__list">
                  {list.map((photo) => {
                    return (
                      <PhotoCard
                        image={photo.image}
                        onClick={() => {
                          setPreviewIndex(
                            images.findIndex(
                              (image) => image.imageId === photo.imageId
                            ) + 1
                          )
                        }}
                        key={photo.imageId}
                      />
                    )
                  })}
                </ul>
              </li>
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

//{images.map((image: IPhoto) => {
//  return (
//    <PhotoCard
//      key={image.imageId}
//      image={image.image}
//      onClick={() => {
//        setPreviewIndex(images.indexOf(image) + 1)
//      }}
//    />
//  )
//})}

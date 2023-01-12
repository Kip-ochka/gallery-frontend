import { useEffect, useState } from 'react'
import testApi from '../../testapi/testapi'
import { IPhoto } from '../../types/models'
import PhotoCard from '../PhotoCard/PhotoCard'
import './PhotoGallery.scss'

function PhotoGallery() {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testApi
      .getPhotos()
      .then((photos) => {
        setPhotos(photos)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className="photos">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="photos__wrapper">
          {photos.map((photo) => {
            return <PhotoCard {...photo} key={photo.imageId} />
          })}
        </ul>
      )}
    </section>
  )
}

export default PhotoGallery

import { useEffect, useState } from 'react'
import testApi from '../../testapi/testapi'
import './PhotoGallery.scss'
interface Photo {
  author: string
  download_url: string
  height: number
  id: string
  url: string
  width: string
}

function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  useEffect(() => {
    testApi.getPhotos().then((photos) => {
      setPhotos(photos)
    })
  }, [])
  return (
    <section className="photos">
      <ul className="photos__wrapper">
        {photos.map((photo) => {
          return (
            <li key={photo.id} className="photo">
              <img
                src={photo.download_url}
                alt={photo.author}
                className="photo__image"
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PhotoGallery

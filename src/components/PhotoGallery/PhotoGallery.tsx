import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { getImages } from '../../store/imageSlice'
import { IImage, IPhoto } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import PhotoCard from '../PhotoCard/PhotoCard'
import './PhotoGallery.scss'

function PhotoGallery() {
  const dispatch = useAppDispatch()
  const { images } = useAppSelector((state) => state.images)

  useEffect(() => {
    dispatch(getImages()).then(unwrapResult)
  }, [])

  return (
    <section className="photos">
      {false ? (
        <div>Loading...</div>
      ) : (
        <ul className="photos__wrapper">
          {images.map((image: IPhoto) => {
            return <PhotoCard key={image.imageId} image={image.image} />
          })}
        </ul>
      )}
    </section>
  )
}

export default PhotoGallery

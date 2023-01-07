import { useState } from 'react'
import './PhotoCard.scss'
import { BIG_SIZE, SMALL_SIZE } from '../../utils/imageSizesLink'
interface PhotoCardProps {
  imageId: string
  image: string
}

function PhotoCard({ imageId, image }: PhotoCardProps) {
  return (
    <li key={imageId} className="photo">
      <img
        src={`${SMALL_SIZE + image}`}
        alt={'Фотография не загрузилась.:('}
        className="photo__image"
      />
    </li>
  )
}

export default PhotoCard

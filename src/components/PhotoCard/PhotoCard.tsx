import { useState } from 'react'
import './PhotoCard.scss'
import { SMALL_SIZE } from '../../utils/imageSizesLink'
import { PhotoCardProps } from '../../types/models'

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

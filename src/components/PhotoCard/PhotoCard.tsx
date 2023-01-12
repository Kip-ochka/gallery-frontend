import { useState } from 'react'
import './PhotoCard.scss'
import { SMALL_SIZE } from '../../utils/imageSizesLink'
import { IImage } from '../../types/models'

function PhotoCard({ image }: { image: string }) {
  return (
    <li className="photo">
      <img
        src={`${SMALL_SIZE + image}`}
        alt={'Фотография не загрузилась.:('}
        className="photo__image"
      />
    </li>
  )
}

export default PhotoCard

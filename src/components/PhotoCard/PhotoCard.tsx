import { useState } from 'react'
import './PhotoCard.scss'
import { BIG_SIZE, SMALL_SIZE } from '../../utils/imageSizesLink'
import { IImage } from '../../types/models'

function PhotoCard({ image, onClick }: { image: string; onClick: () => void }) {
  return (
    <li className='photo'>
      <img
        src={`${BIG_SIZE + image}`}
        alt={'Фотография не загрузилась.:('}
        className='photo__image'
        onClick={onClick}
      />
    </li>
  )
}

export default PhotoCard

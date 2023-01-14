import { IPhoto } from '../../types/models'
import { BIG_SIZE } from '../../utils/imageSizesLink'
import './BigPicture.scss'
import navLeft from '../../img/nav_left.svg'
import navRight from '../../img/nav_right.svg'
import { useEffect } from 'react'

type bigPictureProps = {
  image: IPhoto
  onClose: () => void
  onDecrement: () => void
  onIncrement: () => void
}

export default function BigPicture(props: bigPictureProps) {
  const { image, onClose, onDecrement, onIncrement } = props

  const keyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      onIncrement()
    } else if (e.key === 'ArrowLeft') {
      onDecrement()
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', keyNavigation)
    return () => {
      document.removeEventListener('keyup', keyNavigation)
    }
  }, [])

  return (
    <div className='big-picture'>
      <button onClick={onDecrement} className='big-picture__button'>
        <img
          className='big-picture__button-icon'
          src={navLeft}
          alt='Кнопка пролистывания влево.'
        />
      </button>
      <div className='big-picture__photo-container'>
        <img
          src={BIG_SIZE + image.image}
          alt='Фото.'
          className='big-picture__photo'
          onClick={onClose}
        />
      </div>
      <button onClick={onIncrement} className='big-picture__button'>
        <img
          className='big-picture__button-icon'
          src={navRight}
          alt='Кнопка пролистывания вправо.'
        />
      </button>
    </div>
  )
}

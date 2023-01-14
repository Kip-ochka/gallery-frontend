import { IPhoto } from '../../types/models'
import { BIG_SIZE } from '../../utils/imageSizesLink'
import './BigPicture.scss'
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
      <button
        onClick={onDecrement}
        className='big-picture__button big-picture__button_left'
      ></button>
      <div className='big-picture__photo-container'>
        <img
          src={BIG_SIZE + image.image}
          alt='Фото.'
          className='big-picture__photo'
          onClick={onClose}
        />
      </div>
      <button
        onClick={onIncrement}
        className='big-picture__button big-picture__button_right'
      ></button>
    </div>
  )
}

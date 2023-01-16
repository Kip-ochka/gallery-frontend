import './PhotoCard.scss'
import { SMALL_SIZE } from '../../utils/imageSizesLink'

function PhotoCard({ image, onClick }: { image: string; onClick: () => void }) {
  return (
    <li className="photo">
      <img
        src={`${SMALL_SIZE + image}`}
        alt={'Фотография не загрузилась.:('}
        className="photo__image"
        onClick={onClick}
      />
    </li>
  )
}

export default PhotoCard

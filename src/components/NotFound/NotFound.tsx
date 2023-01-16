import { useNavigate } from 'react-router-dom'
import './NotFound.scss'
function NotFound() {
  const navigate = useNavigate()
  return (
    <section className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">NOT FOUND</h1>
        <p className="not-found__text">404</p>
        <p className="not-found__text">Страница не найдена</p>
        <button
          className="not-found__button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Назад
        </button>
      </div>
    </section>
  )
}

export default NotFound

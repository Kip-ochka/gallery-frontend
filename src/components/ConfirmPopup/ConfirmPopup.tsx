import './ConfirmPopup.scss'

type ConfirmPopupProps = {
  onSubmit: () => void
  onCancel: () => void
}

export default function ConfirmPopup(props: ConfirmPopupProps) {
  const { onSubmit, onCancel } = props
  return (
    <div className='confirm-popup'>
      <div className='confirm-popup__container'>
        <p className='confirm-popup__message'>Вы уверены?</p>
        <button className='confirm-popup__button' onClick={onSubmit}>
          Да
        </button>
        <button className='confirm-popup__button' onClick={onCancel}>
          Отмена
        </button>
      </div>
    </div>
  )
}

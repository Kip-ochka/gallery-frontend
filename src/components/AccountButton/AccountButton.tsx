import {} from 'react'
import { Link } from 'react-router-dom'
import './AccountButton.scss'
function AccountButton() {
  return (
    <Link to="/auth">
      <div className="account">
        <p className="account__text">Аккаунт</p>
        <div className="account__logo" />
      </div>
    </Link>
  )
}

export default AccountButton

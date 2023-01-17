import { Navigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { component: Component, condition } = props

  return condition ? <Component {...props} /> : <Navigate to="/" />
}

export default ProtectedRoute

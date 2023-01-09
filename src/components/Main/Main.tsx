import { Route, Routes } from 'react-router'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import About from '../About/About'
import AddImage from '../AddImage/AddImage'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'
import ProtectedRoute from '../../hok/ProtectedRoute'

export default function Main() {
  const dispatch = useAppDispatch()
  const adminData = useAppSelector((state) => state.admin)

  return (
    <main className='main'>
      <NavBar categories={['Пейзажи', 'Портреты', 'Автомобили', 'Спорт']} />
      <Routes>
        <Route path={'/'} element={<PhotoGallery />} />
        <Route path='/about' element={<About />} />

        <Route
          path='/add-image'
          element={
            <ProtectedRoute component={AddImage} condition={!!adminData} />
          }
        />
        <Route
          path='/sections'
          element={
            <ProtectedRoute component={AddImage} condition={!!adminData} />
          }
        />
        <Route
          path='/tags'
          element={
            <ProtectedRoute component={AddImage} condition={!!adminData} />
          }
        />
      </Routes>
    </main>
  )
}

import { Route, Routes } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import About from '../About/About'
import AddImage from '../AddImage/AddImage'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'
import ProtectedRoute from '../../hok/ProtectedRoute'
import EditSectionsPage from '../EditSectionsPage/EditSectionsPage'
import EditTagsPage from '../EditTagsPage/EditTagsPage'
import NotFound from '../NotFound/NotFound'

export default function Main() {
  const dispatch = useAppDispatch()
  const adminData = useAppSelector((state) => state.admin)

  return (
    <main className="main">
      <NavBar />
      <Routes>
        <Route path={'/'} element={<PhotoGallery />} />
        <Route path={'/sections/:chosenSectionId'} element={<PhotoGallery />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/add-image"
          element={
            <ProtectedRoute component={AddImage} condition={!!adminData} />
          }
        />
        {/* <Route
          path='/tags'
          element={
            <ProtectedRoute component={EditTagsPage} condition={!!adminData} />
          }
        /> */}
        <Route
          path="/edit-sections"
          element={
            <ProtectedRoute
              component={EditSectionsPage}
              condition={!!adminData}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

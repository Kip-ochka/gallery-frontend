import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from '../../utils/hooks/reduxHooks'
import About from '../About/About'
import AddImage from '../AddImage/AddImage'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'
import ProtectedRoute from '../../hok/ProtectedRoute'
import EditSectionsPage from '../EditSectionsPage/EditSectionsPage'
import NotFound from '../NotFound/NotFound'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Main() {
  const adminData = useAppSelector((state) => state.admin)
  const sectionsData = useAppSelector((state) => state.sections)
  const navigate = useNavigate()
  type NavigateType = typeof navigate

  useEffect(() => {
    if (sectionsData.sections[0]?.sectionId) {
      navigate(`/sections/${sectionsData.sections[0].sectionId}`)
    } else {
      navigate(`/`)
    }
  }, [])

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
            <ProtectedRoute
              component={AddImage}
              condition={!!adminData.isLogged}
            />
          }
        />
        {/* <Route
          path='/tags'
          element={
            <ProtectedRoute component={EditTagsPage} condition={!!adminData.isLogged} />
          }
        /> */}
        <Route
          path="/edit-sections"
          element={
            <ProtectedRoute
              component={EditSectionsPage}
              condition={!!adminData.isLogged}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

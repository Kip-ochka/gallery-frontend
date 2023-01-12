import { useAppSelector } from '../../utils/hooks/reduxHooks'
import SectionItem from '../SectionItem/SectionItem'
import './EditPage.scss'

export default function EditSectionsPage() {
  const { sections } = useAppSelector((state) => state.sections)

  return (
    <ul className='edit-page'>
      {sections.map((e) => (
        <SectionItem {...e} />
      ))}
    </ul>
  )
}

import { useAppSelector } from '../../utils/hooks/reduxHooks'

export default function EditSectionsPage() {
  const { sections } = useAppSelector((state) => state.sections)

  return <div className='edit-page'></div>
}

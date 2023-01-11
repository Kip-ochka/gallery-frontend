import { useAppSelector } from '../../utils/hooks/reduxHooks'

export default function EditSectionsPage() {
  const { tags } = useAppSelector((state) => state.tag)

  return <div className='edit-page'></div>
}

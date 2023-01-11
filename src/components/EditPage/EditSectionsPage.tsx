import { useAppSelector } from '../../utils/hooks/reduxHooks'

export default function EditSectionsPage() {
  const { tags } = useAppSelector((state) => state.tagInterface)

  return <div className="edit-page"></div>
}

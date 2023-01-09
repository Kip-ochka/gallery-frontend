import { useAppSelector } from '../../utils/hooks/reduxHooks'

export default function EditTagsPage() {
  const { tags } = useAppSelector((state) => state.tag)
  console.log(tags)

  return <div className='edit-page'></div>
}

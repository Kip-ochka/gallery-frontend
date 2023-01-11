import { useAppSelector } from '../../utils/hooks/reduxHooks'
import TagItem from '../TagItem/TagItem'
import './EditPage.scss'

export default function EditTagsPage() {
  const { addedTags } = useAppSelector((state) => state.tag)

  return (
    <ul className='edit-page'>
      {addedTags.map((e) => (
        <TagItem tag={e.tag} tagId={e.tagId} key={e.tagId} />
      ))}
    </ul>
  )
}

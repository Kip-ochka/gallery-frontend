import { useAppSelector } from '../../utils/hooks/reduxHooks'
import TagItem from '../TagSectionItem/TagItem'
import './EditPage.scss'

export default function EditTagsPage() {
  const { tags } = useAppSelector((state) => state.tag)
  console.log(tags)

  return (
    <ul className='edit-page'>
      {tags.map((e) => (
        <TagItem tag={e.tag} tagId={e.tagId} key={e.tagId} />
      ))}
    </ul>
  )
}

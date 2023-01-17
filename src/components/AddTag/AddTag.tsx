import { ITag } from '../../types/models'
import './AddTag.scss'

type AddTagProps = {
  availiableTags: Array<ITag>
  onChange: (e: { target: { value: string } }) => void
}

export default function AddTag(props: AddTagProps) {
  const { availiableTags, onChange } = props

  if (availiableTags.length > 0) {
    return (
      <select className="add-tag__select" onChange={onChange}>
        <option value="" className="add-tag__text">
          Выберите тег
        </option>
        {availiableTags.map((e) => (
          <option value={e.tag} key={e.tagId} className="add-tag__text">
            {e.tag}
          </option>
        ))}
      </select>
    )
  } else {
    return <p className="add-tag__text">Нет доступных тегов</p>
  }
}

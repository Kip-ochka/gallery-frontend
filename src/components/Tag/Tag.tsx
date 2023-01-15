import { useState } from 'react'
import './Tag.scss'
import { ITagProps } from '../../types/models'
import removeIcon from '../../img/Dell.svg'
import addIcon from '../../img/addTag.svg'
import redactIcon from '../../img/pen.svg'
import backIcon from '../../img/back.svg'
import acceptIcon from '../../img/accept.svg'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import {
  fetchChangeTag,
  fetchDeleteTag,
  removeTagAfterFetchDelete,
} from '../../store/tagInterface'
import { unwrapResult } from '@reduxjs/toolkit'
function Tag({ tagId, tag, onClick, type }: ITagProps) {
  const [redactable, setRedactable] = useState(false)
  const [textContent, setTextContent] = useState(tag)
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  const handleFetchDelete = async () => {
    if (token) {
      try {
        const deleted = await dispatch(
          fetchDeleteTag({ tag, tagId, token })
        ).unwrap()
        dispatch(removeTagAfterFetchDelete(deleted))
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div>
      {type === 'toAdd' ? (
        <div>
          {redactable ? (
            <li className="tag">
              <input
                type="text"
                value={textContent}
                onChange={(e) => {
                  setTextContent(e.target.value)
                }}
                className="tag__input"
                autoFocus={true}
              />
              <button
                className="tag__button tag__button_green"
                onClick={async () => {
                  try {
                    if (token) {
                      const arg = {
                        token: token,
                        tag: textContent,
                        tagId: tagId,
                      }
                      const res = await dispatch(fetchChangeTag(arg)).unwrap()
                      setRedactable(false)
                      return res
                    }
                  } catch (err) {
                    console.log(err)
                  }
                }}
              >
                <img src={acceptIcon} alt="+" />
              </button>
              <button
                className="tag__button tag__button_yellow"
                onClick={() => {
                  setTextContent(tag)
                  setRedactable(false)
                }}
              >
                <img src={backIcon} alt="BACK" />
              </button>
            </li>
          ) : (
            <li className="tag">
              <button
                className="tag__button tag__button_green"
                onClick={() => {
                  onClick({ tagId: tagId, tag: tag })
                }}
              >
                <img src={addIcon} alt="ADD" />
              </button>
              <p className="tag__name">{textContent}</p>
              <button
                className="tag__button tag__button_yellow"
                onClick={() => {
                  setRedactable(true)
                }}
              >
                <img src={redactIcon} alt="RED" />
              </button>
              <button
                className="tag__button tag__button_red"
                onClick={handleFetchDelete}
              >
                <img src={removeIcon} alt="DEL" />
              </button>
            </li>
          )}
        </div>
      ) : (
        <li className="tag">
          <p className="tag__name tag__name_del">{textContent}</p>
          <button
            className="tag__button tag__button_red"
            onClick={() => {
              onClick({ tagId: tagId, tag: tag })
            }}
          >
            <img src={removeIcon} alt="ADD" />
          </button>
        </li>
      )}
    </div>
  )
}

export default Tag

//<input
//        className="tag_input"
//        type="text"
//        value={textContent}
//        onChange={(e) => {
//          setTextContent(e.currentTarget.value)
//        }}
//        disabled={redactable ? false : true}
//      />

import { useState } from 'react'
import { IFormTextValues } from '../../types/models'

export function useForm(inputValues: IFormTextValues) {
  const [values, setValues] = useState(inputValues)

  const handleChange = (event: any) => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
  }
  return { values, handleChange, setValues }
}

import {ChangeEvent, useState} from 'react'

export type FormErrors = Record<string, any>
export type FormValues = Record<string, any>
export type OnChangeHandler = (val: ChangeEvent<HTMLInputElement>) => void
export type OnSubmit = () => void

const useForm = (
		callback: (value: FormValues) => Promise<any>,
		validation: Record<string, Function>,
		initialForm: FormValues
): [FormValues, FormErrors, OnChangeHandler, OnSubmit] => {
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState(initialForm)

	const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
		const {value, name} = target
		setForm({...form, [name]: value})
		const error = validation[name]({...form, [name]: value})
		setErrors({...errors, [name]: error})
	}

	const handleSubmit = () => {
		const errorObj: Record<string, string> = {}
		Object.keys(form).forEach(key => {
			errorObj[key] = validation[key](form)
		})
		setErrors(errorObj)
		if (!Object.values(errorObj).find(element => element)) {
			callback(form).then(() => setForm(initialForm))
		}
	}

	return [form, errors, handleChange, handleSubmit]
}

export default useForm

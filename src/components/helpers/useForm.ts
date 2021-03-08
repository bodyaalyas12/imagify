import React, {ChangeEvent, useState} from 'react'

const useForm = (callback: (value: Record<string, any>) => Promise<any>, validation: Record<string, Function>, initialForm: Record<string, any>) => {
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

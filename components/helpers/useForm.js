import {useState} from 'react'

const useForm = (callback, validation, initialForm) => {
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState(initialForm)

	const handleChange = ({target}) => {
		const {value, name} = target
		setForm({...form, [name]: value})
		const error = validation[name]({...form, [name]: value})
		setErrors({...errors, [name]: error})
	}

	const handleSubmit = () => {
		const errorObj = {}
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

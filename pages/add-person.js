// pages/add-person.js

// Імпортуємо необхідні бібліотеки та компоненти
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '../components/NavBar'
import { Container, Form, Button } from 'react-bootstrap'
import FormComponent from '../components/FormComponent'

// Сторінка для додавання особи до реєстру
export default function AddPerson({ blankFormData, formFieldsNames }) {
	// Ініціалізуємо роутер та стани для форми
	const router = useRouter()
	const [formData, setFormData] = useState({ ...blankFormData })
	const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)
	const [isDataRequired, setIsDataRequired] = useState({
		name: true,
		surname: true,
		patronym: false,
		dateOfBirth: true,
		rnokpp: true,
		unzr: true,
		passportNumber: true,
		gender: true
	})
	// Функція для обробки зміни значення поля форми
	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	// Функція для очищення форми
	const handleClear = () => {
		setFormData({ ...blankFormData })
	}
	// Функція для обробки подання форми
	const handleSubmit = async e => {
		e.preventDefault()
		console.log(formData)
		try {
			const response = await fetch(`${process.env.API_URL}/person`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			if (response.ok) {
				alert('Запис доданий до електронного реєстру. Профіль особи створено. ')
				router.push(`/person-info/${formData.unzr}`)
			} else {
				const data = await response.json()
				const textMessage = JSON.stringify(data)
				alert(`Помилка. Особу не вдалося додати до реєстру ${textMessage}`)
			}
		} catch (error) {
			console.error('Error:', error)
			alert(`Помилка. Особу не вдалося додати до реєстру  ${error}`)
		}
	}
	// Відображення компоненту
	return (
		<div>
			<NavBar />
			<Container>
				<div>
					{/* Заголовок сторінки */}
					<h2 className='mt-5'>
						Введіть повні данні особи щоб додати запис до електронного реєстру.
					</h2>
					{/* Компонент форми */}
					<FormComponent
						formFieldsNames={formFieldsNames}
						formData={formData}
						isDataRequired={isDataRequired}
						isFieldsDisabled={isFieldsDisabled}
						submitButtonText='Надіслати форму і створити особу'
						handleSubmit={handleSubmit}
						handleChange={handleChange}
					/>
					{/* Кнопка для очищення форми */}
					<Button variant='secondary' onClick={handleClear} className='mt-3'>
						Очистити форму
					</Button>
					{/* Кнопка для подання форми */}
					<Button
						variant='success'
						type='submit'
						form='personForm'
						className='mt-3 ms-3'
					>
						Надіслати форму і створити особу
					</Button>
				</div>
			</Container>
		</div>
	)
}

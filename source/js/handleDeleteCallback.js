import { countActiveCallbacks } from './handleCounter.js'
const container = document.querySelector('.callbacks-container')

container.addEventListener('click', e => {
	const { className, closest } = e.target
	if (className === 'info-container__delete-btn' || className === 'delete-icon') {
		const callback = closest('.callback')
		const id = callback.firstElementChild.innerText
		let storageCallbacks = JSON.parse(localStorage.getItem('callbacks')).callbacks

		storageCallbacks = storageCallbacks.filter(el => el.id != id)

		localStorage.setItem('callbacks', JSON.stringify({ callbacks: storageCallbacks }))

		callback.remove()
		countActiveCallbacks()
	}
})

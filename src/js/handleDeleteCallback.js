import { countActiveCallbacks } from './handleCounter.js'
const container = document.querySelector('.callbacks-container')

container.addEventListener('click', e => {
	if (e.target.className === 'info-container__delete-btn') {
		const callback = e.target.parentElement.parentNode
		const id = callback.firstElementChild.innerText
		let storageCallbacks = JSON.parse(localStorage.getItem('callbacks')).callbacks

		storageCallbacks = storageCallbacks.filter(el => el.id != id)

		localStorage.setItem('callbacks', JSON.stringify({ callbacks: storageCallbacks }))

		callback.remove()
		countActiveCallbacks()
	}
})

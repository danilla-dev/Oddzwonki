import { countActiveCallbacks } from './handleCounter.js'
const container = document.querySelector('.callbacks-container')

const saveInLocalStorage = id => {
	let storageCallbacks = JSON.parse(localStorage.getItem('callbacks')).callbacks
	storageCallbacks = storageCallbacks.filter(el => el.id != id)
	localStorage.setItem('callbacks', JSON.stringify({ callbacks: storageCallbacks }))
}

const deleteCallback = callback => {
	const id = callback.firstElementChild.innerText
	saveInLocalStorage(id)
	callback.remove()
	countActiveCallbacks()
}

const getCallback = e => {
	const { className } = e.target
	if (className === 'info-container__delete-btn' || className === 'delete-icon') {
		const callback = e.target.closest('.callback')
		deleteCallback(callback)
	}
}
container.addEventListener('click', getCallback)

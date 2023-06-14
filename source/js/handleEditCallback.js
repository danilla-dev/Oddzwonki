const container = document.querySelector('.callbacks-container')

const saveInLocalStorage = (callbacks, callbackObject) => {
	console.log(callbacks)
	callbackObject.callbacks = callbacks
	console.log(callbackObject)
	localStorage.setItem('callbacks', JSON.stringify(callbackObject))
}

const findCurrentCallback = (id, editedElement, value) => {
	const allCallbacksObject = JSON.parse(localStorage.getItem('callbacks'))
	const allCallbacks = allCallbacksObject.callbacks
	allCallbacks.forEach(callback => {
		if (callback.id == id) {
			callback[editedElement] = value
		}
	})
	console.log(allCallbacksObject)
	saveInLocalStorage(allCallbacks, allCallbacksObject)
}

const showInput = (element, info, buttons, event) => {
	if (event.target.className === 'info-container__edit-btn') {
		const input = document.createElement('input')
		element.firstElementChild.remove()
		element.firstElementChild.remove()
		element.append(input)
		input.addEventListener('keyup', e => {
			editInfo(element, info, buttons, input, e)
		})
	}
}
const editInfo = (element, info, buttons, input, event) => {
	if (event.key === 'Enter') {
		const inputValue = input.value
		input.remove()
		element.append(info)
		element.append(buttons)
		info.textContent = inputValue
		console.log('klik działa')
		const elementID = element.parentElement.firstElementChild.innerText
		const editedElement = element.firstElementChild.id
		findCurrentCallback(elementID, editedElement, inputValue)
	}
}

const getElementInfo = event => {
	const e = event
	const elementToEdit = event.target.parentElement.parentElement
	const elementToEditInfo = elementToEdit.firstElementChild
	const elementToEditButtons = elementToEditInfo.nextElementSibling
	showInput(elementToEdit, elementToEditInfo, elementToEditButtons, e)
}
container.addEventListener('click', getElementInfo)

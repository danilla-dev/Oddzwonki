const container = document.querySelector('.callbacks-container')

const saveInLocalStorage = (callbacks, callbackObject) => {
	callbackObject.callbacks = callbacks
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
	saveInLocalStorage(allCallbacks, allCallbacksObject)
}

const showInput = (element, info, buttons) => {
	const input = document.createElement('input')
	input.value = info.innerText
	element.innerHTML = ''
	element.append(input)
	input.focus()
	input.addEventListener('keyup', e => {
		editInfo(element, info, buttons, input, e)
	})
}
const editInfo = (element, info, buttons, input, event) => {
	if (event.key === 'Enter') {
		const inputValue = input.value
		input.remove()
		element.append(info)
		element.append(buttons)
		info.textContent = inputValue
		const elementID = element.parentElement.firstElementChild.innerText
		const editedElement = element.firstElementChild.id
		findCurrentCallback(elementID, editedElement, inputValue)
	} else if (event.key === 'Escape') {
		input.remove()
		element.append(info)
		element.append(buttons)
	}
}
const getElementInfo = event => {
	const elementToEdit = event.target.parentElement.parentElement
	const elementToEditInfo = elementToEdit.firstElementChild
	const elementToEditButtons = elementToEditInfo.nextElementSibling
	if (event.target.className === 'info-container__edit-btn') {
		showInput(elementToEdit, elementToEditInfo, elementToEditButtons)
	}
}
container.addEventListener('click', getElementInfo)

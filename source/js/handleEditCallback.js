const container = document.querySelector('.callbacks-container')
const unidecode = require('../../node_modules/unidecode/unidecode.js')

String.prototype.capitalize = function () {
	return this.replace(/\b\w/g, function (match) {
		return match.toUpperCase()
	})
}

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

const removeInput = el => {
	const { element, info, buttons, input } = el
	input.remove()
	element.append(info)
	element.append(buttons)
}

const editInfo = el => {
	const { element, info, buttons, input } = el
	const inputValue = unidecode(input.value).capitalize()
	input.remove()
	element.append(info)
	element.append(buttons)
	info.textContent = inputValue
	const elementID = element.parentElement.firstElementChild.innerText
	const editedElement = element.firstElementChild.id
	findCurrentCallback(elementID, editedElement, inputValue)
}

const showInput = el => {
	const { element, info, buttons } = el
	const input = document.createElement('input')
	input.value = info.innerText
	element.innerHTML = ''
	element.append(input)
	input.focus()

	input.addEventListener('keyup', event => {
		const el = { element, info, buttons, input }
		if (event.key === 'Enter') {
			editInfo(el)
		} else if (event.key === 'Escape') {
			removeInput(el)
		}
	})
}

const getElementInfo = event => {
	const buttonClass = 'info-container__edit-btn'
	if (event.target.className === 'edit-icon' || event.target.className === buttonClass) {
		const elementToEdit = event.target.closest('.info-container')
		const elementToEditInfo = elementToEdit.querySelector('.callback__info')
		const elementToEditButtons = elementToEditInfo.querySelector('.edit-buttons')
		const el = { element: elementToEdit, info: elementToEditInfo, buttons: elementToEditButtons }
		// element is a element of callback where user want do editing
		// info is a last editing value
		// buttons is a elements of a buttons - edit and copy
		showInput(el)
	}
}
container.addEventListener('click', getElementInfo)

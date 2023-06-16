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
		info.textContent = unidecode(inputValue).capitalize()
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
	const buttonClass = 'info-container__edit-btn'
	if (event.target.className === 'edit-icon' || event.target.className === buttonClass) {
		const elementToEdit = event.target.closest('.info-container')
		const elementToEditInfo = elementToEdit.firstElementChild
		const elementToEditButtons = elementToEditInfo.nextElementSibling
		showInput(elementToEdit, elementToEditInfo, elementToEditButtons)
	}
}
container.addEventListener('click', getElementInfo)

/// DODAC FORMATOWANIE EDYTOWANEGO TEKSTU W TAKI SAM SPOSOB JAK JEST TO PODCZAS TWORZENIA ELEMENTU
/// LEPSZE WYSZUKIWANIE - PODCZAS WPISYWANIA AKTUALIZUJE SIE CALA TA KARTA I REAGUJE TO NA KAZDA WPISANA LITERKE
/// POLEPSZYC JAKOS WYGLAD TEJ APKI

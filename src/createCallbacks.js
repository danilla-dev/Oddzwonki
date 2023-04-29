const unidecode = require('../node_modules/unidecode/unidecode.js')
import { countActiveCallbacks } from './handleCounter.js'
const addBtn = document.querySelector('.callbacks-creator__buttons-add')
const clearBtn = document.querySelector('.callbacks-creator__buttons-clear')
const callbackTemp = document.querySelector('.callback-temp')
const container = document.querySelector('.callbacks-container')
const phone = document.querySelector('.phone')
const county = document.querySelector('.county')
const requiredInputs = [phone, county]
let saveSwitch = false

String.prototype.capitalize = function () {
	return this.replace(/\b\w/g, function (match) {
		return match.toUpperCase()
	})
}

const findLastId = () => {
	let storageCallbacks = JSON.parse(localStorage.getItem('callbacks'))
	if (storageCallbacks != undefined) {
		let callbackArray = storageCallbacks.callbacks
		let idsArray = []
		callbackArray.forEach(el => {
			idsArray.push(el.id)
		})
		idsArray.sort((a, b) => b - a)
		return idsArray[0]
	}
}

const createElement = (id, name, city, county, province, postCode, phone, comment) => {
	const callback = callbackTemp.content.cloneNode(true)
	const callbackid = callback.querySelector('.id')
	const callbackName = callback.querySelector('.callback__name')
	const callbackCity = callback.querySelector('.callback__city')
	const callbackCounty = callback.querySelector('.callback__county')
	const callbackProvince = callback.querySelector('.callback__province')
	const callbackPostCode = callback.querySelector('.callback__post-code')
	const callbackPhone = callback.querySelector('.callback__phone')
	const callbackComment = callback.querySelector('.callback__comment')

	callbackid.textContent = id
	callbackName.textContent = name
	callbackCity.textContent = city
	callbackCounty.textContent = county
	callbackProvince.textContent = province
	callbackPostCode.textContent = postCode
	callbackPhone.textContent = phone
	callbackComment.textContent = comment

	if (saveSwitch == true) {
		callbackid.textContent = findLastId() ? findLastId() + 1 : 1
		saveInLocalStorage(
			callbackName.textContent,
			callbackCity.textContent,
			callbackCounty.textContent,
			callbackProvince.textContent,
			callbackPostCode.textContent,
			callbackPhone.textContent,
			callbackComment.textContent
		)
	}

	container.prepend(callback)
}

const createStorageCallbacks = () => {
	let storageCallbacks = JSON.parse(localStorage.getItem('callbacks')) || { callbacks: [] }
	let callbackArray = storageCallbacks.callbacks
	console.log(callbackArray)
	callbackArray.forEach(el => {
		createElement(el.id, el.name, el.city, el.county, el.province, el.postCode, el.phone, el.comment)
	})
}

const saveInLocalStorage = async (name, city, county, province, postCode, phone, comment) => {
	let storageCallbacks = JSON.parse(localStorage.getItem('callbacks')) || { callbacks: [] }
	let num = findLastId() ? findLastId() : 0
	num++
	const newCallback = {
		id: num,
		name: name,
		city: city,
		county: county,
		province: province,
		postCode: postCode,
		phone: phone,
		comment: comment,
	}
	storageCallbacks.callbacks.push(newCallback)
	localStorage.setItem('callbacks', JSON.stringify(storageCallbacks))
}

const clearForm = () => {
	const inputs = document.querySelectorAll('input')
	inputs.forEach(input => {
		input.value = ''
	})
	document.querySelector('textarea').value = ''
}

const countErrors = () => {
	const errors = document.querySelectorAll('.creator--error')
	if (errors.length == 0) {
		createNewCallback()
	}
}

const showError = input => {
	input.parentElement.classList.add('creator--error')
	/// dodac wyskakujace okno z bootstrapa
}
const clearError = input => {
	input.parentElement.classList.remove('creator--error')
}

const checkForm = input => {
	if (input.value === '') {
		showError(input)
	} else {
		clearError(input)
	}
}

const createNewCallback = async () => {
	saveSwitch = true
	const id = findLastId() ? findLastId() : 0
	const name = unidecode(document.querySelector('.name').value)
	const city = unidecode(document.querySelector('.city').value)
	const county = unidecode(document.querySelector('.county').value)
	const province = unidecode(document.querySelector('.province').value)
	const postCode = unidecode(document.querySelector('.post-code').value)
	const phone = unidecode(document.querySelector('.phone').value)
	const comment = unidecode(document.querySelector('.comment').value)

	createElement(
		id,
		name.capitalize(),
		city.capitalize(),
		county.capitalize(),
		province.capitalize(),
		postCode,
		phone,
		comment
	)
	clearForm()
}

addBtn.addEventListener('click', () => {
	requiredInputs.forEach(input => {
		checkForm(input)
	})
	countErrors()
	countActiveCallbacks()
})
clearBtn.addEventListener('click', clearForm)
window.addEventListener('DOMContentLoaded', createStorageCallbacks)

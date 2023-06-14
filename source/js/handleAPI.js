import axios from 'axios'
const countyList = document.querySelector('#county-list')
const postCodeList = document.querySelector('#post-code-list')
const cityInput = document.querySelector('#city')
const countyInput = document.querySelector('#county')
const provinceInput = document.querySelector('#province')
const postCodeInput = document.querySelector('#post-code')

const URL = `https://postal-code.search.api.ongeo.pl/1.0/autocomplete
?api_key=5520601b-5e4e-49f4-af9b-696fe4b671d7&additionalData=address&query=`
Array.prototype.unique = function () {
	return [...new Set(this)]
}

const completeCountyDatalist = () => {
	countyList.innerHTML = ''
	const searchCity = cityInput.value
	axios.get(URL + searchCity).then(res => {
		const allData = res.data
		let counties = []
		allData.map(city => {
			if (city.type === 'city') {
				counties.push(city.address.province)
			}
		})
		counties = counties.unique()
		counties.forEach(county => {
			const newOption = document.createElement('option')
			newOption.value = county
			countyList.appendChild(newOption)
		})
	})
}

const completeProvince = () => {
	const selectedCounty = countyInput.value
	const selectedCity = cityInput.value
	let currentProvince = []
	if ((selectedCounty, selectedCity != '')) {
		axios.get(URL + selectedCity).then(res => {
			const allData = res.data
			allData.map(city => {
				if (city.type === 'city' && city.address.province === selectedCounty) {
					currentProvince.push(city.address.state)
				}
			})
			currentProvince = currentProvince.unique()
			provinceInput.value = currentProvince
		})
	}
}
const completePostCodeDatalist = () => {
	postCodeList.innerHTML = ''
	const selectedCounty = countyInput.value
	const selectedCity = cityInput.value
	const selectedProvince = provinceInput.value
	let currentPostalCodes = []
	if ((selectedCounty, selectedCity, selectedProvince != '')) {
		axios.get(URL + selectedCity).then(res => {
			const allData = res.data
			allData.map(city => {
				if (city.type === 'city' && city.address.province === selectedCounty) {
					currentPostalCodes.push(...city.postalCodes)
				}
			})
			currentPostalCodes = currentPostalCodes.unique()
			currentPostalCodes.forEach(code => {
				const newOption = document.createElement('option')
				newOption.value = code
				postCodeList.appendChild(newOption)
			})
		})
	}
}
countyInput.addEventListener('focus', completeCountyDatalist)
provinceInput.addEventListener('focus', completeProvince)
postCodeInput.addEventListener('focus', completePostCodeDatalist)


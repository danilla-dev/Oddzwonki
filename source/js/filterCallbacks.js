const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')

const compareWithUserSearch = (allCounties, userSearch) => {
	allCounties.forEach(county => {
		const callback = county.closest('.callback')
		if (
			!county.innerText.toLowerCase().includes(userSearch.toLowerCase()) ||
			!county.innerText.toLowerCase() === userSearch.toLowerCase
		) {
			callback.style.display = 'none'
			callback.classList.remove('active')
		} else {
			callback.style.display = 'block'
			callback.classList.add('active')
		}
	})
}

const findAllCounties = e => {
	e.preventDefault()
	const searchCallback = e.target.value
	const allCountiesOfCallbacks = document.querySelectorAll('.callback__county')
	compareWithUserSearch(allCountiesOfCallbacks, searchCallback)
}


searchBtn.addEventListener('click', findAllCounties)
searchInput.addEventListener('keyup', findAllCounties)


const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')

const filterCallbacks = e => {
	e.preventDefault()
	const allCallBacks = document.querySelectorAll('.callback')
	const searchCallback = searchInput.value.toLowerCase()
	allCallBacks.forEach(callback => {
		const callbackCounty = callback.children[3].children[0].innerText.toLowerCase()
		if (searchCallback == '') {
			callback.style.display = 'block'
			
		} else if (callbackCounty != searchCallback) {
			callback.style.display = 'none'
			callback.classList.remove('active')
		} else {
			callback.style.display = 'block'
		
		}
	})
}

searchBtn.addEventListener('click', filterCallbacks)

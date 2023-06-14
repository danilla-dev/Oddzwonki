const container = document.querySelector('.callbacks-container')

container.addEventListener('click', e => {
	if (e.target.className === 'info-container__copy-btn') {
		const info = e.target.parentElement.previousElementSibling.innerText
		navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
			if (result.state == 'granted' || result.state == 'prompt') {
			}
		})
		navigator.clipboard.writeText(info).then(() => {
			e.target.innerText = 'Skopiowano'
			e.target.style.opacity = '1'
		})
	}
})

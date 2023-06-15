const container = document.querySelector('.callbacks-container')

container.addEventListener('click', e => {
	if (e.target.className === 'info-container__copy-btn' || e.target.className === 'copy-icon') {
		console.log(e.target)
		const info = e.target.closest('.info-container').firstElementChild.innerText
		console.log(info)
		navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
			if (result.state == 'granted' || result.state == 'prompt') {
			}
		})
		navigator.clipboard.writeText(info).then(() => {
			if (e.target.tagName === 'BUTTON') {
				// zrobic to za pomoca klasy a nie styli
				e.target.style.backgroundColor = 'greenyellow'
				e.target.style.opacity = '1'
			} else {
				e.target.parentElement.style.backgroundColor = 'greenyellow'
				e.target.parentElement.style.opacity = '1'
			}
		})
	}
})

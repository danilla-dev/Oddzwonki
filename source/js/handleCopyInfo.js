const container = document.querySelector('.callbacks-container')

container.addEventListener('click', e => {
	const { target } = e
	if (target.className === 'info-container__copy-btn' || target.className === 'copy-icon') {
		const info = target.closest('.info-container').firstElementChild.innerText

		navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
			if (result.state == 'granted' || result.state == 'prompt') {
			}
		})
		navigator.clipboard.writeText(info).then(() => {
			if (target.tagName === 'BUTTON') {
				// zrobic to za pomoca klasy a nie styli
				target.style.backgroundColor = 'greenyellow'
				target.style.opacity = '1'
			} else {
				target.parentElement.style.backgroundColor = 'greenyellow'
				target.parentElement.style.opacity = '1'
			}
		})
	}
})

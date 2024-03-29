
const addBtn = document.querySelector('.callbacks-creator__buttons-add')
const counter = document.querySelector('.counter')

export const countActiveCallbacks = () => {
	const allCallbacks = document.querySelectorAll('.active')
	counter.innerText = allCallbacks.length
}
document.addEventListener('DOMContentLoaded', ()=>{
  let storageCallbacks = JSON.parse(localStorage.getItem('callbacks')).callbacks.length
	counter.innerText = storageCallbacks
})
addBtn.addEventListener('click', countActiveCallbacks)

console.log('Client-side js is running')

fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data.puzzle)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-one')
const msgTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', event => {
    event.preventDefault()

    msgOne.textContent = 'Loading ... '
    msgTwo.textContent = ''

    fetch('/weather?address=' + search.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})

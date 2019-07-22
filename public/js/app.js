const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('wheather?address=' + location).then ((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = 'No se pudo encontrar el sitio'
                // console.log('Falló')
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

    // console.log(location)
})


console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/wheather?address=boston').then ((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             return console.log('Falló')
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/wheather?address=' + location).then ((response) => {
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


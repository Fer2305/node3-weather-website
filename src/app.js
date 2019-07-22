const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup estatic directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Fernando'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Fernando Chavarría'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        message: 'Help me, please',
        name: 'Fernando'
    })
})

app.get('/wheather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Debe digitar una dirección válida'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provid a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: 'El artículo de ayuda no fue encontrado',
        name: 'El desarrollador',
        errorMessage: "La página que solicita no fue encontrada"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Página no encontrada',
        name: 'El desarrollador',
        errorMessage: "La página que solicita no fue encontrada"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
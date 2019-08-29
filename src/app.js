const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// console.log(path.join(__dirname, '../public'))

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs
app.set('view engine', 'hbs')
//set views path
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//use public dir
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        appname: 'Weather app',
        title: 'Home'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        appname: 'Weather app',
        title: 'About',
        name: 'Muhammad Mufid',
        age: 21,
        loc: 'Bandung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        appname: 'Weather app',
        title: 'help'
    })
})

app.get('/help/*', (req, res) => {
    res.send('cant find help article')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(
        req.query.address,
        (error, { latitude, longtitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    address: req.query.address,
                    location,
                    forecast: forecastData
                })
            })
        }
    )
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please fill search form'
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error: 404',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up in port ' + port)
})

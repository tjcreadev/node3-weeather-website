const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

// Requiring utils
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

// Start express
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Timothy Stephens'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Timothy Stephens'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Timothy Stephens',
        message: 'This is the help message.'
    })
})

// START WEATHER GET
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Oops. No address provided!'});
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {return res.send(error)};

        forecast(longitude, latitude, location, (error, data) => {
            if(error) {return res.send(error)};

            res.send({
                location: location,
                searchedAddress: req.query.address,
                //alerts: data.body.alerts[0].description,
                currentWeather: `<strong>Right now:</strong> ${data.body.currently.summary} | <strong>Temperature:</strong> ${data.body.currently.temperature} degrees <br>
                <strong>Later:</strong> ${data.body.hourly.summary}`,
                data: data.body
            })
        })
    })//end geocode
})// END WEATHER GET



app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term.'
        })
    } else {
        console.log(req.query.search);
        res.send({
            products:[]
        })
    }// end if else

})

// 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error Page',
        message: 'Sorry, no help information found at that URL.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error Page',
        message: 'Sorry, no page found at that URL.'
    })
})


// NOTHING ELSE BELOW THIS
// START APP
app.listen(3000, () => {
    console.log('Server is up on port 3000')
});



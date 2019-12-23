const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// Definition for the path of express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

console.log(publicDirectoryPath);
console.log(viewsPath);

const port = process.env.PORT || 3000;
// app's configuration
const app = express();
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// hbs partial configuration
hbs.registerPartials(partialsPath);

// GET / POST - s
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'konstantin'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'konstantin'
    });
} );

app.get('/help', (req, res) => {
    res.render('help', {
        helpTitle: "Help",
        helpText: "Can I help you ?"
    })
});


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search'
        })
    } else {
        res.send({
            products: []
        })
    }
});



app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Must be an address"
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error) {
            return res.send({ error })
        }

        forecast (latitude, longitude, (error, forecastData) => {
            if (error) { 
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        name: 'konstantin',
        errorMessage: '404 error'
    });
});

app.listen(port, () => console.log("server running on port: " + port)); 
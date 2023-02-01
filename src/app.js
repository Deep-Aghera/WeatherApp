const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('../../WeatherApp/utils/geocode');
const forecast = require('../../WeatherApp/utils/forecast');

// path for config
let publicDir = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');


app.set('view engine','hbs');
app.set('views',viewsPath);
console.log()
hbs.registerPartials(partialPath);
app.use(express.static(publicDir))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'deep aghera'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        help : "this help section",
        title : "help page",
        name : "deep aghera"
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        error: "help article not found",
        title : "404",
        name : 'deep aghera'
       })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: "about page",
        name : "deep aghera"
    })
})

app.get('/weather',(req,res) => {
    console.log(req.query)
    if(!req.query.address) {
        return res.send({
            error : "please provide address",
        })
    }
    console.log(geocode);
    geocode(req.query.address,(error,data) => {
        if(error) {
            return res.send({
                error : error,
            })
        }
        else {
            let {latitude,longitude} = data;
            forecast(latitude,longitude,(error,wdata) => {
                if(error) {
                    return res.send(error);
                }
                else {
                    console.log("w dataaaaaaaaaaaaaaaaaaa",wdata)
                    return res.send(wdata)
                }
            })
          
        }
    }) 
    // return res.send({
    //     city : req.query.address,
    //     latitude : 45.544
    // })
})



app.get('*',(req,res) => {
   res.render('error',{
    error: "not found page",
    name : 'deep aghera'
   })
})


app.listen(3000,() => {
    console.log("now we are running on 3000 port")
})
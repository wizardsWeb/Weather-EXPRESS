const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "4aa8d54ec4fc2540ad60bdd5119b3573";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
    
    https.get(url ,(response) =>{
        console.log(response.statusCode);
        
        response.on("data", (data) => {
           const weatherData = JSON.parse(data);
            // console.log(weatherData)
        const temp = weatherData.main.temp;
        // console.log(temp);
        const weatherDescription = weatherData.weather[0].description;
        // console.log(weatherDescription);
        // console.log(temp);
           /* const object= {
                name : "Vinay",
                favouriteFood : "Ramen"
            }
            const parseString = JSON.stringify(object);
            console.log(object );
            console.log(parseString ); */
            const weatherIcon = weatherData.weather[0].icon;
            const imageUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius</u></h1>`);
            res.write(`<h1><u>The weather is currently ${weatherDescription}</u></h1>`);
            res.write(`<img src ="${imageUrl}">`);
            res.send();
        })
    })
})



app.listen(port , () =>{
    console.log(`The server is running on port ${port}`);
})
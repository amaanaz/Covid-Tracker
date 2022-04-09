const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

var express = require("express");
var axios = require('axios');
var router = express.Router();

// let block;
// let date1;
// let date2;



function getCountryData(res, country) {
    var data = JSON.stringify({
        "collection": "Country_Data",
        "database": "Covid_Data",
        "dataSource": "Covid19-Data",
        "filter": {
            "Country": country
        },
        // "limit": 2                         // limit the number of results
    });

    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-bypio/endpoint/data/beta/action/findOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'F02kPyKBcXnDi8lyBGLdrLlshBssKy7rxYkVzH1j1xW7j1NPZSyfynTfE36SRxHq'
        },
        data: data
    };

    var country_response;

    axios(config)
        .then(function (response) {

            console.log(JSON.stringify(response.data['document']));

            if (response.data['document'] === null) { res.send({ "data": null }); }

            else {
                country_response = {
                    "Country": response.data['document']['Country'],
                    "Cases": response.data['document']['TotalConfirmed'],
                    "Deaths": response.data['document']['Deaths'],
                    "Recovered": response.data['document']['Recovered'],
                    "Date": response.data['document']['Date'],
                }

                res.send(country_response);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

function getDataGlobal(res) {

    var data_object;

    fetch("https://api.covid19api.com/summary")
        .then(res => res.json())

        .then(text => {
            // let lambai = text["Countries"].length;
            // console.log(text["Global"]["TotalConfirmed"]);

            data_object = {
                // "New": text["Countries"][i]["Country"],
                "Active": text["Global"]["TotalConfirmed"],
                "Recovered": text["Global"]["TotalRecovered"],
                "Deaths": text["Global"]["TotalDeaths"],
                // "Date": text["Countries"][i]["Date"].slice(0, 10),
            }
            res.send(data_object);
        });
}


function getDataAll(res) {
    var data = JSON.stringify({
        "collection": "Country_Data",
        "database": "Covid_Data",
        "dataSource": "Covid19-Data",
        "filter": {
            // "Country": country
        },
        // "limit": 2                         // limit the number of results
    });

    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-bypio/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'F02kPyKBcXnDi8lyBGLdrLlshBssKy7rxYkVzH1j1xW7j1NPZSyfynTfE36SRxHq'
        },
        data: data
    };

    var data_response = [], a;

    axios(config)
        .then(function (response) {

            console.log(JSON.stringify(response.data['document']));

            for (let i = 0; i < response.data['documents'].length; i++) {
                a = response.data['documents'][i];
                // console.log(a);
                // sent += "\n" + i + ": " + a;
                data_response.push({
                    "Country": a["Country"],
                    "Cases": a["TotalConfirmed"],
                    "Deaths": a["Deaths"],
                    "Recovered": a["Recovered"],
                    "Date": a["Date"]
                });
            }

            // country_response = {
            //     "Country": response.data['document']['Country'],
            //     "Cases": response.data['document']['TotalConfirmed'],
            //     "Deaths": response.data['document']['Deaths'],
            //     "Recovered": response.data['document']['Recovered'],
            //     "Date": response.data['document']['Date'],
            // }

            res.send(data_response);
            // res.send(data_response[0]["Country"]);
        })
        .catch(function (error) {
            console.log(error);
        });

}


// Route matching
router.get("/", async (req, res, next) => {

    getDataAll(res);

});


router.get("/:countryName", function (req, res, next) {

    if (req.params.countryName == "Global") {
        getDataGlobal(res);
    }
    else {
        getCountryData(res, req.params.countryName);
    }
    console.log("Country name: " + req.params.countryName);

});


module.exports = router;


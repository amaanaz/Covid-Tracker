const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/*
This file is used to update the Db about the covid data
*/

var axios = require('axios');
var express = require("express");
var router = express.Router();

function getDataGlobal(res) {
    // var data = JSON.stringify({
    //     "collection": "Country_Data",
    //     "database": "Covid_Data",
    //     "dataSource": "Covid19-Data",
    //     "filter": {
    //         // used to filter on a key, if nothing is provided, means everything is returened
    //     },
    //     // "limit": 2                         // limit the number of results
    // });

    // var config = {
    //     method: 'post',
    //     url: 'https://data.mongodb-api.com/app/data-bypio/endpoint/data/beta/action/find',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Request-Headers': '*',
    //         'api-key': 'F02kPyKBcXnDi8lyBGLdrLlshBssKy7rxYkVzH1j1xW7j1NPZSyfynTfE36SRxHq'
    //     },
    //     data: data
    // };

    // var sent = [];
    // var response_array = [];

    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         // console.log(JSON.stringify(response.data['documents']));
    //         // response.forEach(console.dir);
    //         // res.send(response.data['documents'][2]['text']);

    // for (let i = 0; i < response.data['documents'].length; i++) {
    //     let a = response.data['documents'][i];
    //     // console.log(a);
    //     // sent += "\n" + i + ": " + a;
    //     response_array.push({
    //         "id": a["_id"],
    //         "Country": a["Country"],
    //         "Cases": a["TotalConfirmed"],
    //     });
    // }

    //         res.send(response_array);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    var country_object;


    fetch("https://api.covid19api.com/summary")
        .then(res => res.json())

        .then(text => {
            // let lambai = text["Countries"].length;

            data_object = {
                // "New": text["Countries"][i]["Country"],
                "Confirmed": text["Global"]["TotalConfirmed"],
                "Recovered": text["Global"]["TotalRecovered"],
                "Deaths": text["Global"]["TotalDeaths"],
                // "Date": text["Countries"][i]["Date"].slice(0, 10),
            }
        });



}



function getDataOne(res) {
    var data = JSON.stringify({
        "collection": "Country_Data",
        "database": "Covid_Data",
        "dataSource": "Covid19-Data",
        "filter": {
            "Country": "Argentina"
        },
        //"limit": 1                         // limit the number of results
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

            country_response = {
                "Country": response.data['document']['Country'],
                "Cases": response.data['document']['TotalConfirmed'],
                "Deaths": response.data['document']['Deaths'],
                "Recovered": response.data['document']['Recovered'],
                "Date": response.data['document']['Date'],
            }


            res.send(country_response);
        })
        .catch(function (error) {
            console.log(error);
        });

}



function insertData(res) {

    var country_object;


    fetch("https://api.covid19api.com/summary")
        .then(res => res.json())

        .then(text => {
            let lambai = text["Countries"].length;

            for (let i = 0; i < lambai; i++) {

                country_object = {
                    "_id": i + 1,
                    "Country": text["Countries"][i]["Country"],
                    "TotalConfirmed": text["Countries"][i]["TotalConfirmed"],
                    "Recovered": text["Countries"][i]["TotalRecovered"],
                    "Deaths": text["Countries"][i]["TotalDeaths"],
                    "Date": text["Countries"][i]["Date"].slice(0, 10),
                }

                var data = JSON.stringify({
                    "collection": "Country_Data",
                    "database": "Covid_Data",
                    "dataSource": "Covid19-Data",
                    "document": country_object
                });

                var config = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-bypio/endpoint/data/beta/action/insertOne',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Headers': '*',
                        'api-key': 'F02kPyKBcXnDi8lyBGLdrLlshBssKy7rxYkVzH1j1xW7j1NPZSyfynTfE36SRxHq'
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        res.write(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });

}

router.get("/", async (req, res, next) => {

    // Function to query all data from DB
    getDataOne(res);

    // Function to insert data in DB
    // ! DONT UN-COMMENT THIS, UNLESS YOU WANT TO ADD OR REFRESH THE DATA IN THE DATABASE
    // insertData(res);

});

module.exports = router;

// API test Key from mongo DB
// Api key name: covid_test_api
// F02kPyKBcXnDi8lyBGLdrLlshBssKy7rxYkVzH1j1xW7j1NPZSyfynTfE36SRxHq

// Website for covid API
// "https://api.covid19api.com/summary"
// Covid Api Parameters:
// ID
// Country
// CountryCode
// Slug
// NewConfirmed
// TotalConfirmed
// NewDeaths
// TotalDeaths
// NewRecovered
// TotalRecovered
// Date

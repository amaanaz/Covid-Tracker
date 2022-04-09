import { useState } from "react";

const Table = () => {

    const [response, setResponse] = useState({
        "Active": "Loading...",
        "Recovered": "Loading...",
        "Deaths": "Loading...",
    });

    const [selectedCountry, setSelectedCountry] = useState("Select Location");

    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran, Islamic Republic of",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (north)",
        "Korea (south)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao PDR",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao, SAR China",
        "Madagascar, Republic of",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia, Federated States of",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestinian Territory",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Republic of Kosovo",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic (Syria)",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom of Great Britain and Northern Ireland",
        "United States Minor Outlying Islands",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands US",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];

    function country_data(country) {
        // fetch("http://localhost:9000/covid_data/" + country)
        fetch("https://evening-fjord-72925.herokuapp.com/covid_data/" + country)
            .then(res => res.json())
            .then(data => {

                console.log(data.data);

                if (data.data === null) {
                    setResponse({ Active: "--NaN--", Deaths: "--NaN--", Recovered: "--NaN--" });
                    alert("No data available for " + country);
                } else {
                    let recovered = data.Recovered;
                    if (recovered === 0) {
                        setResponse({ Active: data["Cases"], Deaths: data["Deaths"], Recovered: "Missing Data" });
                    }
                    else {
                        setResponse({ Active: data["Cases"], Deaths: data["Deaths"], Recovered: data["Recovered"] });
                    }

                    // console.log(response);
                }

            });
    }


    return (
        <div className="container" style={{
            margin: "5rem", textAlign: "center", marginLeft: "15%"
        }}
        >
            <div className="row">
                <div className="col">
                    <div className="dropdown" >
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {selectedCountry}
                        </button>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink"
                            style={{ overflow: 'scroll', height: '200px', 'overflowY': 'visible', 'overflowX': 'hidden' }}
                        >
                            {countries.map((country, key) => (
                                <li
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        setSelectedCountry(e.target.innerText);
                                        country_data(e.target.innerText);
                                        // console.log(e.target.innerText);
                                    }}>
                                    {country}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Active</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{response.Active}</h6>

                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Recovered</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{response.Recovered}</h6>

                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Deceased</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{response.Deaths}</h6>

                        </div>
                    </div>
                </div>

            </div >

        </div >
    );
};

export default Table;
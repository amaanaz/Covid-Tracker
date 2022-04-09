import { useRef, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Global() {
    const [data, setData] = useState("Data should show here");
    const [active, setActive] = useState([]);
    const [recovered, setRecover] = useState([]);
    const [deaths, setDeath] = useState([]);
    const [graph_data, setGraph] = useState([]);
    const [time, setTime] = useState([]);

    function global_data() {
        // fetch("http://localhost:9000/covid_data/Global")
        fetch("https://evening-fjord-72925.herokuapp.com/covid_data/Global")
            .then((res) => res.json())
            .then(json => { setData(json) });
        // console.log(data.Active);


        setActive([
            parseInt(data.Active / 5),
            parseInt(data.Active / 4),
            parseInt(data.Active / 3),
            parseInt(data.Active / 3),
            parseInt(data.Active / 4)
        ]);

        setRecover([
            "Missing Data",
            "Missing Data",
            "Missing Data",
            "Missing Data",
            "Missing Data",
        ]);

        setDeath([
            parseInt(data.Deaths * 9),
            parseInt(data.Deaths * 2),
            parseInt(data.Deaths * 3),
            parseInt(data.Deaths * 5),
            parseInt(data.Deaths * 1)
        ]);

        setTime(['2020-01-01', '2020-06-01', '2021-01-01', '2021-06-01', '2022-01-01'])

        setGraph([
            { time: time[0], Active: active[0], Recovered: recovered[0], Deaths: deaths[0] },
            { time: time[1], Active: active[1], Recovered: recovered[1], Deaths: deaths[1] },
            { time: time[2], Active: active[2], Recovered: recovered[2], Deaths: deaths[2] },
            { time: time[3], Active: active[3], Recovered: recovered[3], Deaths: deaths[3] },
            { time: time[4], Active: active[4], Recovered: recovered[4], Deaths: deaths[4] }
        ]);

    }
    let from = useRef(null);
    let to = useRef(null);

    function data_calc() {
        // TODO: change graph based on selected date range

        let dateFrom = new Date(from.current.valueAsDate);
        let dateTo = new Date(to.current.valueAsDate);


        // console.log("Date diff (time):" + Math.abs(dateTo - dateFrom));
        let diffDays = Math.ceil(Math.abs(dateTo - dateFrom) / (1000 * 60 * 60 * 24));
        console.log("Date diff (days):" + diffDays);

        let newDate = new Date(dateFrom);
        // let addedDate = Math.ceil(Math.abs(dateTo.setDate(dateTo.getDate() + 79)) / (1000 * 60 * 60 * 24));
        console.log("Date (added):" + newDate.setDate(newDate.getDate() + 79));
        console.log("Date (added):" + newDate);


        let fromDateStr = from.current.value.split("-");
        let toDateStr = to.current.value.split("-");
        console.log(to.current.value, toDateStr);

        if (from.current.value === "" || to.current.value === "") {
            alert("Please enter Dates");
        }
        else if (parseInt(toDateStr[0]) < parseInt(fromDateStr[0])) {
            alert("Invalid date range");
        }
        else if (diffDays < (153)) {
            alert("Please select a date range more than 5 months");
        }
        else {
            let toDateStrCalc = toDateStr[2] + 10;
            let fromDateStrCalc = fromDateStr[2] + 10;
            setActive([
                Math.abs(parseInt((data.Active) / (toDateStrCalc - 5))),
                Math.abs(parseInt((data.Active) / (fromDateStrCalc - 2))),
                Math.abs(parseInt((data.Active) / (toDateStrCalc - 6))),
                Math.abs(parseInt((data.Active) / (fromDateStrCalc - 1))),
                Math.abs(parseInt((data.Active) / (toDateStrCalc - 8)))
            ]);

            setRecover([
                "Missing Data",
                "Missing Data",
                "Missing Data",
                "Missing Data",
                "Missing Data",
            ]);

            setDeath([
                Math.abs(parseInt((data.Deaths) / (toDateStrCalc - 8))),
                Math.abs(parseInt((data.Deaths) / (fromDateStrCalc - 2))),
                Math.abs(parseInt((data.Deaths) / (toDateStrCalc - 9))),
                Math.abs(parseInt((data.Deaths) / (fromDateStrCalc - 1))),
                Math.abs(parseInt((data.Deaths) / (toDateStrCalc - 7)))
            ]);
            // console.log(dateTo.getDate() + "-" + dateTo.getUTCMonth() + "-" + dateTo.getFullYear());
            // console.log(dateTo.toDateString());

            var dates = [""];

            for (let i = 1; i < 4; i++) {
                dates[i] = new Date(dateFrom);
                dates[i].setDate(dates[i].getDate() + ((diffDays / 5) * i));
                dates.push(dates[i].toDateString());
                console.log(dates[i].toDateString());
            }
            // console.log(dates[1]);


            setTime([dateFrom.toDateString(), dates[1].toDateString(), dates[2].toDateString(), dates[3].toDateString(), dateTo.toDateString()]);

            setGraph([
                { time: time[0], Active: active[0], Recovered: recovered[0], Deaths: deaths[0] },
                { time: time[1], Active: active[1], Recovered: recovered[1], Deaths: deaths[1] },
                { time: time[2], Active: active[2], Recovered: recovered[2], Deaths: deaths[2] },
                { time: time[3], Active: active[3], Recovered: recovered[3], Deaths: deaths[3] },
                { time: time[4], Active: active[4], Recovered: recovered[4], Deaths: deaths[4] }
            ]);
        }

    }

    return (

        <div >
            <form className="nav-item">
                <label for="from" className="text-dark">
                    From&nbsp;
                </label>

                <input type="date" id="date" className="fromDateStr" ref={from} min="2020-01-01" max="2022-02-26" placeholder="2020-01-01" />

                <label for="to" className="text-dark">
                    &nbsp;&nbsp;&nbsp; To&nbsp;
                </label>

                <input type="date" id="date" className="toDateStr" ref={to} min="2020-01-02" max="2022-02-25" placeholder="2022-02-25" />

                <br /><br />

                <input className="btn btn-outline-success" type="button" value="Search Global Data" onClick={() => { global_data(); data_calc() }} />

                <input className="btn btn-outline-primary" type="button" value="Display All time Data" onClick={() => { global_data(); }} />

            </form>

            <p>
                <b> Please select the dates to Search for global Data <br />
                    Press the button again, if graph not updated </b>
            </p>

            <div style={{ margin: "4%", }}>

                <LineChart width={1800} height={450} data={graph_data} >
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5 5" />
                    <XAxis dataKey="time" />
                    <YAxis type="number" domain={[dataMin => Math.abs(1000 - Math.abs(dataMin)),
                    dataMax => (dataMax)]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Active" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Recovered" stroke="#242936" />
                    <Line type="monotone" dataKey="Deaths" stroke="#82ca9d" />
                </LineChart>

            </div>

        </div >);
}

export default Global;
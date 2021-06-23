/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
//declare  apiKey 
const apiKey = '1208a77295621e4a7b1fd5500e6e1bde&units=imperial';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKeyURL = '&appid='

let generateBtn = document.getElementById("generate");
generateBtn.addEventListener('click', generatefun);
let feelingText = document.getElementById("feelings");

function generatefun(e) {
    let Zip = document.getElementById('zip');


    if (Zip.value) {
        let ZipCode = Zip.value;

        let apiURL = baseURL + ZipCode + apiKeyURL + apiKey;
        console.log("apiURL : ", apiURL);

        console.log("Calling Get Data");
        getData(apiURL)
            .then(function (data) {
                console.log("Calling Post Data");
                //postData('/addData', { temp: data.temp, date: newDate, userResponse: data.userResponse });
                postData('/addData', { temp: data.main.temp, date: newDate, userResponse: feelingText.value });
            })
            .then(function () {
                updateUI();
            }
            );
    } else {
        alert("Please, enter a zip code");
    }
}
//GetData function to get the api 
const getData = async (apiURL) => {
    const request = await fetch(apiURL);
    try {
        const data = await request.json();
        // console.log("getData data : ", data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}
//PostData function
const postData = async (url = "", data = {}) => {
    // console.log("postData URL : ", url);
    // console.log("data : ", data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    try {
        // console.log("in try post");
        return;
    }
    catch (error) {
        console.log("error", error);
    }

}

//declare the updateUI function
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        console.log("in try updateUI");
        const allData = await request.json();
        console.log("allData", allData);
        document.getElementById('date').innerText = allData.date;
        document.getElementById('temp').innerText = allData.temp;
        document.getElementById('content').innerText = allData.userResponse;
    }
    catch (error) {
        console.log("error", error);
    }
}

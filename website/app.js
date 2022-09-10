/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='&appid=a05e5d65f5aeebac5ea293119060bf35&units=imperial';
const btn =document.getElementById('generate')
//Button
btn.addEventListener('click',performAction);
function performAction(e){
    let zipKey=document.getElementById('zip').value
    let content = document.getElementById('feelings').value
    getWeatherData(baseURL+zipKey+apiKey)
    .then(function(data){
        postWeatherData('/postData',{date:newDate, temp:WeatherData.main.temp ,content:content})
    })
    .then(async function(data){
        const noders=await fetch('/all')
        const finalData=await noders.json()
        console.log(finalData)
    })
    .then( ()=>{
        updateUI(); }
    );
}
//Get
const getWeatherData = async (baseURL,zipKey,apiKey)=>{
    const response = await fetch(baseURL+zipKey+apiKey)
    try{
        WeatherData=await response.json();
        // return WeatherData;
    }catch(error){
        console.log('error',error)
    }
}
//Post
const postWeatherData = async(url ='', data={})=>{
    const response = await fetch(url, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        // console.log(newData);
        return newData;
    }catch(error){
        console.log('error',error)
    }
}
//update UI
const updateUI = async ()=>{
    const request = await fetch('/all');
    try{
        const allData= await request.json();
        document.querySelector('#date').innerHTML=allData.date;
        document.querySelector('#temp').innerHTML=allData.temp;
        document.querySelector('#content').innerHTML=allData.content;
    } catch(error){
        console.log('error',error)
    }
}

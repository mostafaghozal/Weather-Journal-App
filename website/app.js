const form = document.querySelector('.app__form');
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=0751a5140d44418d88287a4b420b3f3f';
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);
function performAction(ev) {
  ev.preventDefault();
  
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getInfo(baseURL, newZip, apiKey)
    .then(function (userData) {
  
      try{
      postData('/add', { date: newDate, temp: userData.main.temp, content })
      }
      catch(error){
        alert("This Zip code doesn't exist in US");  
// If the user entered wrong zip code a notification pops up
      }
    }).then(function (newData) {
     
      updateUI()
    })

  form.reset();
}

const getInfo = async (baseURL, newZip, apiKey) => {
 
  const res = await fetch(baseURL + newZip + apiKey);
  try {

    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
       
  }
}

const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};

const moment = require('moment')

const BASE_URL = 'http://localhost:3001';



function getAllData () {
  return fetchRequest('/questions')
}

function sendToDb (event) {
  // event.date = moment(event.date).format('DD-MM-YYYY, h:mm:ss a')
  event.date = moment(event.date).format('hh:mm:ss')
  console.log(event)
  return fetchRequest('/questions', {
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify(event)
  })
}


function fetchRequest(path, options) {
  return fetch(BASE_URL+path, options)
      .then((res) => res.status <= 400 ? res.json() : Promise.reject(res))
      .catch (err => {
        console.log(err, 'error during fetch req');
      })
}

module.exports = {
  getAllData,
  sendToDb
}
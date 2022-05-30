//  navigation button for going to mypets.html
function goToMyPets() {
  viewPets.addEventListener("click", (window.location.href = "myPets.html"));
}

// navigation button for going back to homepage
function goToIndex() {
  goHomepage.addEventListener("click", (window.location.href = "index.html"));
}

// curl -d "grant_type=client_credentials&client_id=pcOOphn8LZripwmmfhEXx8RXrETc8Tl98i0ur0E2qQoCgTY2TV&client_secret=RIRHL8ucrwQrfxzYOtVebcHMnLTCET7ZnBpwuTAn" https://api.petfinder.com/v2/oauth2/token



var requestURL ='https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=dog&page=2';

var apiKey = 'pcOOphn8LZripwmmfhEXx8RXrETc8Tl98i0ur0E2qQoCgTY2TV';

var secret ='RIRHL8ucrwQrfxzYOtVebcHMnLTCET7ZnBpwuTAn';

var token;

// fetch(requestURL, {

//   method: "GET",
//   mode: "cors",
//   headers: {
//     "Access-Control-Allow-Method": "*",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + token,
//   },
// })
// .then(function(response) {
//   return response.json();
// })
// .then (function(data) {
//   console.log(data);
// });

fetch('https://api.petfinder.com/v2/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: apiKey,
    client_secret: secret,
  }),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const token = data.access_token;
    const authorization = 'Bearer ' + token;

    fetch('https://api.petfinder.com/v2/animals', {
      headers: { Authorization: authorization, 'Content-Type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (doggieData) {
        console.log('>>> doggieData >>>', doggieData);
      });
  });
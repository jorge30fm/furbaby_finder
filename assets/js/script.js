//  navigation button for going to mypets.html
function goToMyPets() {
  viewPets.addEventListener("click", (window.location.href = "myPets.html"));
}

// navigation button for going back to homepage
function goToIndex() {
  goHomepage.addEventListener("click", (window.location.href = "index.html"));
}

var petPhoto = $("#petPhoto");
var petName = $("#petName");
var petAge = $("#petAge");
var petGender = $("#petGender");
var petBreed = $("#petBreed");
var petCity = $("#petCity")
var swipeLeft =$("#swipeLeft");
var swipeRight = $("#swipeRight")

var requestURL ='https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=dog&page=2';

var apiKey = 'pcOOphn8LZripwmmfhEXx8RXrETc8Tl98i0ur0E2qQoCgTY2TV';

var secret ='RIRHL8ucrwQrfxzYOtVebcHMnLTCET7ZnBpwuTAn';

var token;

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

    fetch('https://api.petfinder.com/v2/animals?type=dog', {
      headers: { Authorization: authorization, 'Content-Type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (doggieData) {
        console.log('>>> doggieData >>>', doggieData);
      });
  });



/* create fetch call to retrieve data about animals
when the user swipes, a new animal is presented
if user swiped right, animal info is saved to local storage and displayed in saved pets html page
*/
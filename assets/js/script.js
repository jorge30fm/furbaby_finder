//  navigation button for going to mypets.html
function goToMyPets() {
  viewPets.addEventListener("click", (window.location.href = "myPets.html"));
}

// navigation button for going back to homepage
function goToIndex() {
  goHomepage.addEventListener("click", (window.location.href = "index.html"));
}
var requestURL ='https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=dog&page=2';
var apiKey = 'pcOOphn8LZripwmmfhEXx8RXrETc8Tl98i0ur0E2qQoCgTY2TV';
var secret ='RIRHL8ucrwQrfxzYOtVebcHMnLTCET7ZnBpwuTAn';
var token;
var petPhoto = $("#petPhoto");
var petName = $("#petName");
var petAge = $("#petAge");
var petGender = $("#petGender");
var petBreed = $("#petBreed");
var petCity = $("#petCity")
var swipeLeft =$("#swipeLeft");
var swipeRight = $("#swipeRight");
var petDescription = $("#description");
var petURL = $("#petURL")
var count = 0;
var petData;
var savedPets = [];



//when user swipes left, next pet is displayed
swipeLeft.click(function() {
    count++;
    if (count < 100){
    displayInfo();
    console.log(count)
    }
    else {
      count = 0;
    fetchPetData()
    }
});

//when user swipes right,pet info is saved to local storage and next pet is displayed
swipeRight.click(function(){
  savedPets.push(petData.animals[count]);
  localStorage.setItem("savedPets", JSON.stringify(savedPets));
  count ++
  if (count < 100) {
    displayInfo();
    console.log(count)
    }
    else {
      count = 0;
    fetchPetData()
    }
})

var  fetchPetData = function(){
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

    fetch('https://api.petfinder.com/v2/animals?type=dog&limit=100', {
      headers: { Authorization: authorization, 'Content-Type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (doggieData) {
        petData = doggieData;
        console.log(petData)
        displayInfo()
      })
  });
}

var displayInfo = function() {
    //add pet Image
    var imageSrc = petData.animals[count].primary_photo_cropped.medium;
    var imageEl = $('<img src="'+ imageSrc +'">')
    petPhoto.html(imageEl)

    //add Pet Name
    var name = petData.animals[count].name;
    petName.text(name)

    //add age
    var age = petData.animals[count].age
    petAge.text(age)
    //add gender
    var gender = petData.animals[count].gender
    petGender.text(gender)

    //add Breed
    var checkMixedBreed = petData.animals[count].breeds.mixed;
    if(checkMixedBreed) {
      var breed = petData.animals[count].breeds.primary;
      petBreed.text(breed)
    } else {
      var primaryBreed = petData.animals[count].breeds.primary;
      var secondaryBreed = petData.animals[count].breeds.secondary;
      petBreed.text("Mixed: " + primaryBreed + 'and ' + secondaryBreed)
    }
    // add city
    var city = petData.animals[count].contact.address.city;
    var state = petData.animals[count].contact.address.state;
    petCity.text(city + ', ' + state);

    //add description
    var description = petData.animals[count].description;
    petDescription.text(description)
    // add url link
    var url = petData.animals[count].url;
    petURL.attr("href", url)
  }

fetchPetData()






//  navigation button for going to mypets.html
function goToMyPets() {
  viewPets.addEventListener("click", (window.location.href = "mypets.html"));
}

// navigation button for going back to homepage
function goToIndex() {
  goHomepage.addEventListener("click", (window.location.href = "index.html"));
}


var apiKey = 'yx6kmrR7AcI9lMtVntSNSOhIQLMC4srWHTMa525QEBdnLkUW4n';
var secret ='zW1n1wtTBr5pN6G1DGSdV1nGFTzYHKBEQL6bL5zc';
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
var petData = {}
var savedPets = [];
var DogFacts = {}


//when user swipes left, next pet is displayed
swipeLeft.click(function() {
    count++;
    console.log('click')
    if (count < 100){
    displayInfo();
    }
    else {
      count = 0;
    fetchPetData()
    }
});

//when user swipes right,pet info is saved to local storage and next pet is displayed
swipeRight.click(function(){
  if (localStorage.getItem('savedPets')==null) {
  savedPets.push(petData.animals[count]);
  localStorage.setItem("savedPets", JSON.stringify(savedPets));
  } else {
    savedPets = JSON.parse(localStorage.getItem("savedPets"));
    savedPets.push(petData.animals[count]);
    localStorage.setItem('savedPets', JSON.stringify(savedPets));
  }
  count ++
  if (count < 100) {
    displayInfo();
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

    fetch('https://api.petfinder.com/v2/animals?type=dog&limit=100&sort=random', {
      headers: { Authorization: authorization, 'Content-Type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (doggieData) {
        petData = doggieData;
        displayInfo()
      })
  });
}

var displayInfo = function() {
    //add pet Image
    var imageSrc = petData.animals[count].primary_photo_cropped.small;
    var imageEl = $('<img src="'+ imageSrc +'">')
    petPhoto.html(imageEl)

    //add Pet Name
    var name = petData.animals[count].name;
    petName.text(name)

    //add age
    var age = petData.animals[count].age
    petAge.text(age)
    //add gender
    var gender = petData.animals[count].gender;
    if (gender === "Female"){
      petGender.html('<i class="fa-solid fa-venus">')
    } else if (gender === "Male") {
      petGender.html('<i class="fa-solid fa-mars">')
    }
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

var deployPage = function(){
  var body =$('body').attr('id')
  if (body === 'index') {
      fetchPetData()
  }
  else if (body ==='myPets') {
    var savedList = JSON.parse(localStorage.getItem('savedPets'));
    for (count = 0; count < savedList.length; count++) {
      var card = ` <div class="card cardItem" id='card` + count + `'>
    <div class="column myPetsPhoto is-4 text">
      <figure class="" id="petPhoto` + count + `">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
      <div class="column is-8">
        <p class="myPetsName" id="petName` + count + `">NAME</p>
        <i class="fa-solid fa-paw"></i>
        <p id='petAge`+ count + `'>AGE</p>
        <div id="petGender`+ count +`"></div>
        <p id="petBreed`+ count +`">BREED</p>
        <p id="petCity`+ count +`">CITY</p>
        <p id="description`+ count +`">
        DESCRIPTION
        </p>
        <p class="petlink">Read more <a id="petURL`+ count +`">here</a></p>
      </div>
      </div>`;
    $("#displaySaved").append(card);

    var displaySavedPets = function() {
      var petPhoto = $("#petPhoto" + count);
      var petName = $("#petName" + count);
      var petAge = $("#petAge"+ count);
      var petGender = $("#petGender" + count);
      var petBreed = $("#petBreed"+ count);
      var petCity = $("#petCity"+ count)
      var swipeLeft =$("#swipeLeft"+ count);
      var swipeRight = $("#swipeRight"+ count);
      var petDescription = $("#description"+ count);
      var petURL = $("#petURL"+ count)

      var imageSrc = savedList[count].primary_photo_cropped.small;
      var imageEl = $('<img src="'+ imageSrc +'">')
      petPhoto.html(imageEl)

      //add Pet Name
      var name = savedList[count].name;
      petName.text(name)

      //add age
      var age = savedList[count].age
      petAge.text(age)
      //add gender
      var gender = savedList[count].gender
      if (gender === "Female") {
        petGender.html('<i class="fa-solid fa-venus">')
        } else if (gender === "Male") {
        petGender.html('<i class="fa-solid fa-mars"></i>')
        }
      //add Breed
      var checkMixedBreed = savedList[count].breeds.mixed;
      if(checkMixedBreed) {
        var breed = savedList[count].breeds.primary;
        petBreed.text(breed)
      } else {
        var primaryBreed = savedList[count].breeds.primary;
        var secondaryBreed = savedList[count].breeds.secondary;
        petBreed.text("Mixed: " + primaryBreed + 'and ' + secondaryBreed)
      }
      // add city
      var city = savedList[count].contact.address.city;
      var state = savedList[count].contact.address.state;
      petCity.text(city + ', ' + state);

      //add description
      var description = savedList[count].description;
      petDescription.text(description)
      // add url link
      var url = savedList[count].url;
      petURL.attr("href", url)
    }
    displaySavedPets()
    }
  }
}

deployPage()
var factIndex = 0;

var showFact = function() {
  $('.fact').text(DogFacts.facts[factIndex])

  if (factIndex < 435) {
    factIndex++;
  } else {
    factIndex = 0;
  }
}

fetch('https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/all')
.then(function(response){
  return response.json()
})
.then (function(dogFacts){
  DogFacts = dogFacts;
  setInterval(showFact, 5000)
})


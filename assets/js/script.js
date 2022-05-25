//  navigation button for going to mypets.html
function goToMyPets() {
  viewPets.addEventListener("click", (window.location.href = "myPets.html"));
}

// navigation button for going back to homepage
function goToIndex() {
  goHomepage.addEventListener("click", (window.location.href = "index.html"));
}

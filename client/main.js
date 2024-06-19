console.log("Testing!");

//Hamburger icon animation function
const container = document.getElementById("hamb-container");
const ul = document.getElementById("show");
container.addEventListener("click", function () {
  this.classList.toggle("showing");

  if (ul.classList.contains("showing")) {
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
  }
});


//Hamburger icon animation function 
const container = document.getElementById('hamb-container');
const ul = document.getElementById('show');

container.addEventListener("click", function() {
    this.classList.toggle("change");
    ul.classList.toggle("nav-mob-container");
});

// search bar code
const searchBar = document.getElementById("search-bar");


const searchBarButton = document.getElementById("search-bar-button");
searchBarButton.addEventListener("click", (event) => {
  event.preventDefault();
  loadDrinks();
});

const loadDrinks = async () => {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
        searchBar.value
    );
    const data = await response.json();
    console.log(data.drinks);
    displayDrinks(data.drinks);
  } catch (err) {
    console.log(err);
  }
};

function displayDrinks(drinks) {
  let drinkSelection = document.getElementById("drink-suggestion-div");
  drinkSelection.innerHTML = "";
  for (let i = 0; i < drinks.length; i++) {
    let drinkText = document.createElement("p");
    drinkText.innerHTML = drinks[i].strDrink;
    drinkSelection.appendChild(drinkText);
  }
}

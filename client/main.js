console.log("Testing!");

//Hamburger icon animation function 
const container = document.getElementById('hamb-container');
const ul = document.getElementById('show');

container.addEventListener("click", function() {
    this.classList.toggle("change");
    ul.classList.toggle("nav-mob-container");

});

// search bar code
const searchBar = document.getElementById("search-bar");
const searchedDrinksContainer = document.getElementById("drink-list-div");
const searchBarButton = document.getElementById("search-bar-button");
searchBarButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchedDrinksContainer.style.backgroundColor = "#fff"
  searchedDrinksContainer.style.opacity = 0.8;



  loadDrinks();
});

const loadDrinks = async () => {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
        searchBar.value
    );
    const data = await response.json();
    console.log(data)
    displayDrinks((data.drinks))
  } catch (err) {
    console.log(err);
  }
};

//  TESTING API SEARCH AND DISPLAY IMG'S

function displayDrinks(drinks) {
  let drinkSelection = document.getElementById("drink-list-div");
  drinkSelection.innerHTML = "";
  for (let i = 0; i < drinks.length; i++) {
    // Create a div to hold both the text and image
    let drinkDiv = document.createElement("div");
    drinkDiv.style.marginBottom = "20px";

    // Create a paragraph for the drink name
    let drinkText = document.createElement("a");
    drinkText.href = '#';
    drinkText.classList.add("drink-names")
    drinkText.textContent = drinks[i].strDrink;
    drinkText.style.color = "black";


    // Create an image element for the drink image
    let drinkImage = document.createElement("img");
    drinkImage.classList.add('drink-thumb');
    drinkImage.src = drinks[i].strDrinkThumb;
    drinkImage.alt = drinks[i].strDrink;
    drinkImage.style.width = "200px";
    drinkImage.style.height = "200px";
    drinkImage.style.objectFit = "cover";

    // Append the drink name and image to the drinkDiv
    drinkDiv.appendChild(drinkText);
    drinkDiv.appendChild(drinkImage);

    // Append the drinkDiv to the drinkSelection div
    drinkSelection.appendChild(drinkDiv);
  }
}


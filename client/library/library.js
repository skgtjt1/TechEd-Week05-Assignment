console.log("testing!");

//Hamburger icon animation function
const container = document.getElementById("hamb-container");
const ul = document.getElementById("show");

container.addEventListener("click", function () {
  this.classList.toggle("change");
  ul.classList.toggle("nav-mob-container");
});

const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

async function fetchRandomCocktail() {
  const response = await fetch(url);
  const data = await response.json();
  displayCocktail(data.drinks[0]);
}
fetchRandomCocktail();

function displayCocktail(drink) {
  // drink title
  let mainDiv = document.getElementById("library-div");
  mainDiv.innerHTML = "";
  let titleDiv = document.createElement("div");
  titleDiv.classList.add("drink-title");
  let h2 = document.createElement("h2");
  h2.innerHTML = drink.strDrink;
  titleDiv.appendChild(h2);
  mainDiv.appendChild(titleDiv);

  // drink image
  let imageDiv = document.createElement("div");
  let drinkImage = document.createElement("img");
  drinkImage.classList.add("drink-image");
  drinkImage.src = drink.strDrinkThumb;
  imageDiv.appendChild(drinkImage);
  mainDiv.appendChild(imageDiv);

  // drink instructions
  let instructionDiv = document.createElement("div");
  instructionDiv.classList.add("drink-instructions-div");
  let drinkInstruction = document.createElement("p");
  drinkInstruction.classList.add("drink-instructions");
  drinkInstruction.innerHTML = drink.strInstructions;
  instructionDiv.appendChild(drinkInstruction);
  mainDiv.appendChild(instructionDiv);

  //drink ingredients
  let ingredientsDiv = document.createElement("div");
  let ingredientsTitle = document.createElement("h2");
  ingredientsTitle.innerHTML = "Ingredients";
  ingredientsDiv.appendChild(ingredientsTitle);
  ingredientsDiv.classList.add("ingredients-div");
  let i = 1;
  while (drink["strIngredient" + i] !== null) {
    let drinkMeasure = document.createElement("p");
    let drinkIngredients = document.createElement("p");
    drinkMeasure.innerHTML = drink["strMeasure" + i];
    drinkIngredients.innerHTML = drink["strIngredient" + i];
    ingredientsDiv.append(drinkMeasure);
    ingredientsDiv.append(drinkIngredients);
    i++;
  }
  mainDiv.append(ingredientsDiv);
}

// create button to refresh the cocktail displayed
// query selector here is getting the anchor inside the #refresh section
let refresh = document.querySelector("#refresh a");
refresh.addEventListener("click", (event) => {
  event.preventDefault();
  fetchRandomCocktail();
});

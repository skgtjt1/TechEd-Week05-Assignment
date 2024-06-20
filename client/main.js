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

const searchBarButton = document.getElementById("search-bar-button");
searchBarButton.addEventListener("click", (event) => {
  event.preventDefault();
  loadDrinks();
  // loadImg();
});

const loadDrinks = async () => {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
        searchBar.value
    );
    const data = await response.json();
    console.log(data)
    // displayDrinks(data[0].drinks);
    displayDrinks((data.drinks))
    // const myArray = [];
    // const img = data.strDrinkThumb;
    // myArray.push[img]
    // console.log(myArray)
  } catch (err) {
    console.log(err);
  }
};
// function displayDrinks(drinks) {
//   let drinkSelection = document.getElementById("drink-suggestion-div");
//   drinkSelection.innerHTML = "";
//   for (let i = 0; i < drinks.length; i++) {
//     let drinkText = document.createElement("p");
//     drinkText.innerHTML = drinks[i].strDrink;
//     drinkSelection.appendChild(drinkText);
//   }
// }




//  TESTING API SEARCH AND DISPLAY IMG'S

// const loadImg = async () => {
//   try {
//     const response = await fetch(
//       "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
//       searchBar.value
//     );
//     const data = await response.json();
//     console.log(data)
//     console.log(data.drinks[0].strDrinkThumb);
//     displayDrinksImg(data.drinks[0].strDrinkThumb);
//     // displayDrinks((data.strDrinkThumb))
//     // const myArray = [];
//     // const img = data.strDrinkThumb;
//     // myArray.push[img]
//     // console.log(myArray)
//   } catch (err) {
//     console.log(err);
//   }
// };

function displayDrinks(drinks) {
  let drinkSelection = document.getElementById("drink-list-div");
  drinkSelection.innerHTML = "";
  for (let i = 0; i < drinks.length; i++) {
    // Create a div to hold both the text and image
    let drinkDiv = document.createElement("div");
    drinkDiv.style.marginBottom = "20px"; // Add some spacing between drinks

    // Create a paragraph for the drink name
    let drinkText = document.createElement("a");
    drinkText.href = '#';
    drinkText.textContent = drinks[i].strDrink;


    // Create an image element for the drink image
    let drinkImage = document.createElement("img");
    drinkImage.classList.add('drink-thumb');
    drinkImage.src = drinks[i].strDrinkThumb;
    drinkImage.alt = drinks[i].strDrink;
    drinkImage.style.width = "200px";
    drinkImage.style.height = "200px";
    drinkImage.style.objectFit = "cover"; // Ensures the image covers the 200x200 area

    // Append the drink name and image to the drinkDiv
    drinkDiv.appendChild(drinkText);
    drinkDiv.appendChild(drinkImage);

    // Append the drinkDiv to the drinkSelection div
    drinkSelection.appendChild(drinkDiv);
  }
}
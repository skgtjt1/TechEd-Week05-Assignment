const form = document.getElementById("user-form");

async function fetchAndShowUserCocktails() {
  const response = await fetch("http://localhost:6969/usercocktails"); //need to replace with render server address on deploy //
  const cocktailList = await response.json();
  console.log(cocktailList);
  const cocktailListDiv = document.getElementById("form-results");
  //blank out the div before populating with entries fetched from database
  cocktailListDiv.innerHTML = "";

  //loop through the database entries fetched above
  cocktailList.forEach(function (cocktail) {
    const cocktailDiv = document.createElement("div");

    cocktailDiv.innerHTML = `<p>Username: ${cocktail.username}, Cocktail Name: ${cocktail.cocktail_name}, Recipe: ${cocktail.recipe}, Rating: ${cocktail.rating}, Difficulty: ${cocktail.difficulty}, Alcohol?: ${cocktail.alcoholic} </p>`;
    cocktailListDiv.appendChild(cocktailDiv);
  });
}

fetchAndShowUserCocktails();

form.addEventListener("submit", submitButton);

async function submitButton(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  formValues.alcoholic = formData.has("alcoholic");

  try {
    const response = await fetch("http://localhost:6969/usercocktails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Comment uploaded to database");
      fetchAndShowUserCocktails();
      // form.reset(); //need to clear the form one submit
    } else {
      console.log("Error with database update.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const form = document.getElementById("user-form");

async function fetchAndShowUserCocktails() {
  const response = await fetch(
    "https://teched-week05-assignment.onrender.com/usercocktails"
  ); //need to replace with render server address on deploy // - replaced now
  const cocktailList = await response.json();
  console.log(cocktailList);
  const cocktailListDiv = document.getElementById("form-results");
  //blank out the div before populating with entries fetched from database
  cocktailListDiv.innerHTML = "";

  //loop through the database entries fetched above
  cocktailList.forEach(function (cocktail) {
    const cocktailDiv = document.createElement("div");
    cocktailDiv.classList.add("cocktail-results");
    const usernameDiv = document.createElement("div");
    const cocktailNameDiv = document.createElement("div");
    const ingredientNumDiv = document.createElement("div");
    const recipeDiv = document.createElement("div");
    const difficultyDiv = document.createElement("div");
    const alcoholicDiv = document.createElement("div");
    const submissionDateDiv = document.createElement("div");
    usernameDiv.innerHTML = `<p>Username: ${cocktail.username}</p>`;
    cocktailNameDiv.innerHTML = `<p>Cocktail Name: ${cocktail.cocktail_name}</p>`;
    ingredientNumDiv.innerHTML = `Number Of Ingredients: ${cocktail.number_ingredients}</p>`;
    recipeDiv.innerHTML = `Recipe: ${cocktail.recipe}</p>`;
    difficultyDiv.innerHTML = `Difficulty: ${cocktail.difficulty}</p>`;
    const alcoholicText = cocktail.alcoholic ? "Yes" : "No"; //found this little trick to convert boolean to yes/no using a "ternary" operator, basically if true then "Yes", if false then "No".
    alcoholicDiv.innerHTML = `<p>Alcohol: ${alcoholicText}</p>`;
    // delete button
    submissionDateDiv.innerHTML = `<p>${new Date(
      cocktail.submission_date
    ).toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    })}</p>`; //found the options parameter for toLOcaleString,
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = async function () {
      await deleteCocktail(cocktail.id);
      fetchAndShowUserCocktails(); // Refresh the list after deletion
    };

    cocktailDiv.append(
      usernameDiv,
      cocktailNameDiv,
      ingredientNumDiv,
      recipeDiv,
      difficultyDiv,
      alcoholicDiv,
      submissionDateDiv,
      deleteButton
    );
    cocktailListDiv.appendChild(cocktailDiv);
  });
}

// cocktailDiv.appendChild(usernameDiv);
// cocktailDiv.appendChild(cocktailNameDiv);
// cocktailDiv.appendChild(ingredientNumDiv);
// cocktailDiv.appendChild(recipeDiv); condensed this down with .append
// cocktailDiv.appendChild(difficultyDiv);
// cocktailDiv.appendChild(alcoholicDiv);
// cocktailListDiv.appendChild(cocktailDiv);

fetchAndShowUserCocktails();

form.addEventListener("submit", submitButton);

async function submitButton(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  formValues.alcoholic = formData.has("alcoholic");
  // clear form on submit
  form.reset();

  try {
    const response = await fetch(
      "https://teched-week05-assignment.onrender.com/usercocktails",
      {
        //replaced now
        //Replace on deployment
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

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

async function deleteCocktail(cocktailId) {
  const url = `https://teched-week05-assignment.onrender.com/usercocktails/${cocktailId}`; //need to replace with render server address when deploying - replaced now

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Cocktail deleted successfully:", data);
    } else {
      console.error("Failed to delete cocktail:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const form = document.getElementById("user-form");
const serverURL = "hhttps://teched-week05-assignment.onrender.com"; // made this a variable since I got sick of swttching the address for all endpoints when testing locally
//this is the current render.com server address https://teched-week05-assignment.onrender.com

async function fetchAndShowUserCocktails() {
  const response = await fetch(`${serverURL}/usercocktails`);
  const cocktailList = await response.json();
  console.log(cocktailList);
  const cocktailListDiv = document.getElementById("form-results");
  cocktailListDiv.innerHTML = ""; // clear previous results

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

    usernameDiv.innerHTML = `<p><span style="font-weight: bold;">Username: </span>${cocktail.username}</p>`;
    cocktailNameDiv.innerHTML = `<p><span style="font-weight: bold;">Cocktail: </span>${cocktail.cocktail_name}</p>`;
    ingredientNumDiv.innerHTML = `<p><span style="font-weight: bold;">No. Ingredients: </span>${cocktail.number_ingredients}</p>`;
    recipeDiv.innerHTML = `<p><span style="font-weight: bold;">Recipe: </span>${cocktail.recipe}</p>`;
    difficultyDiv.innerHTML = `<p><span style="font-weight: bold;">Difficulty: </span>${cocktail.difficulty}</p>`;
    const alcoholicText = cocktail.alcoholic ? "Yes" : "No";
    alcoholicDiv.innerHTML = `<p><span style="font-weight: bold;">Alcohol: </span>${alcoholicText}</p>`;
    submissionDateDiv.innerHTML = `<p style="font-style: italic; font-size: smaller;"> ${new Date(
      cocktail.submission_date
    ).toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })}</p>`;

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

fetchAndShowUserCocktails();

form.addEventListener("submit", submitButton);

async function submitButton(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  formValues.alcoholic = formData.has("alcoholic");

  try {
    const response = await fetch(`${serverURL}/usercocktails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Cocktail uploaded to database");
      fetchAndShowUserCocktails();
      form.reset(); // clear form on submit success
    } else {
      console.log("Error with database update.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteCocktail(cocktailId) {
  const url = `${serverURL}/usercocktails/${cocktailId}`;

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

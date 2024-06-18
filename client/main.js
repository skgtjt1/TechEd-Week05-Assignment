console.log("Testing!");



//Hamburger icon animation function 
const container = document.getElementById('hamb-container');
const ul = document.getElementById('show');
container.addEventListener("click", function() {
    this.classList.toggle("change")
    // ul.classList.toggle("nav-mob-container")
    ul.classList.toggle("showing"); // Toggle 'open' class on ul (mobile nav)

    // Optional: Adjust display property if you need inline/block display
    if (ul.classList.contains("showing")) {
        ul.style.display = "block";
    } else {
        ul.style.display = "none";
    }
})



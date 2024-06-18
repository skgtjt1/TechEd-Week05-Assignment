console.log("Testing!");



//Hamburger icon animation function 
const container = document.getElementById('hamb-container');
const ul = document.getElementById('show');
container.addEventListener("click", function() {
    this.classList.toggle("showing")

    if (ul.classList.contains("showing")) {
        ul.style.display = "block";
    } else {
        ul.style.display = "none";
    }
})


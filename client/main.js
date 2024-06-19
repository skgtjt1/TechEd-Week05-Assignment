console.log("Testing!");



//Hamburger icon animation function 
const container = document.getElementById('hamb-container');
const ul = document.getElementById('show');

container.addEventListener("click", function() {
    this.classList.toggle("change");
    ul.classList.toggle("nav-mob-container");
});


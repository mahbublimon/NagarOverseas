document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar and Footer
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            initNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));

    fetch("footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}
const startForm = document.getElementById("start-form");

if (startForm) {
    startForm.addEventListener("submit", event => {
        event.preventDefault();
        document.getElementById("static-form").removeAttribute("hidden");
        Array.from(document.getElementsByClassName("intro")).forEach(element => {
            console.log(element)
            element.style = 'display:none;';
        });
    });
}
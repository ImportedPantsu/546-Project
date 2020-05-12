let userCreation = document.getElementById("user-creation");

if(userCreation){
    userCreation.addEventListener("submit", async (event)=>{
        let uname = document.getElementById("uname");
        let pwd = document.getElementById("pwd");
        let contact = document.getElementById("contact");
        let newUserError = document.getElementById("newUserError");
        if(!uname.value || !pwd.value ||!contact.value) {
            newUserError.hidden = false;
            event.preventDefault();
        }
    });
}
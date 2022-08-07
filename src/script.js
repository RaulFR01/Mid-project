function validateForm(){
    const fullName = document.getElementById("full-name").value;
    const mail = document.getElementById("mail").value;
    const phone = document.getElementById("phone").value;


    console.log(fullName);

    let errorMessage = "";
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if(fullName === "ironhack" || fullName.includes("ironhack")){
        alert("You can not be Ironhack, because I am Ironhack.");
        return false;
    } else if(!mail.includes("@")){
        errorMessage = "You must write a valid email address";
        document.getElementById("error-message").innerHTML += errorMessage;
        return false;
    } else if (!phoneRegex.test(phone)) {
        errorMessage = "You must write a valid phone number";
        document.getElementById("error-message").innerHTML += errorMessage;
        return false;
    }

    return true;
}
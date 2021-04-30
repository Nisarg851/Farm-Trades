//select element function
const selectElement = function (element) {
    return document.querySelector(element);
};

let menuToggler = selectElement('.menu-toggle');
let body = selectElement('body');

//toggling menu using nav links in "mobile view" only
const toggle = () => {
    let menu=body.classList[0];
    if(menu==="open")
        body.classList.toggle('open');
}

menuToggler.addEventListener('click' , function(){
    body.classList.toggle('open');
});

//contact us
function validation()
{
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var error_message = document.getElementById("error-message");
    var text;

    error_message.style.padding = "10px";

    if(name.length < 3)
    {
        text = "Please Enter Full Name";
        error_message.innerHTML = text;
        return false;
    }

    if(email.indexOf("@") == -1 || email.length < 12)
    {
        text = "Please Enter Valid Email";
        error_message.innerHTML = text;
        return false;
    }

    if(message.length<=20)
    {
        text = "Enter More Than 20 Characters";
        error_message.innerHTML = text;
        return false;
    }

    alert("Form Submitted Successfully!");
    return true;
}

//scroll reveal
window.sr = ScrollReveal();

sr.reveal('.animate-left' , {
    origin: 'left',
    duration: 1000,
    distance: '25rem',
    delay: 300
});

sr.reveal('.animate-right' , {
    origin: 'right',
    duration: 1000,
    distance: '25rem',
    delay: 600
});

sr.reveal('.animate-top' , {
    origin: 'top',
    duration: 1000,
    distance: '25rem',
    delay: 600
});

sr.reveal('.animate-bottom' , {
    origin: 'bottom',
    duration: 1000,
    distance: '25rem',
    delay: 300
});
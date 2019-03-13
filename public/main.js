$(document).ready(() => {
   
    
    // Registration User Elements
    const fname = $('#fname');
    const lname = $('#lname');
    const email = $('#regemail');
    const pass = $('#pass');
    const Register = $('#registrationForm');

    // CONTACT FORM ELEMENTS
    const cName = $('#Cname');
    const cEmail = $('#Cemail');
    const cMsg = $('#contactMsg');
    const Contact = $('#contactForm');
    // Login Form Elements
    const LogEmail = $('#email');
    const password = $('#password');
    const loginForm = $('#LoginForm');
     // Materialise Methods
    M.AutoInit();
    $('.sidenav').sidenav();
    $('.slider').slider();
    $('.parallax').parallax();
    $('.modal').modal();
    $('.scrollspy').scrollSpy();

    // Main methods 
    //For Clearing Fields 
    const resetInput= ()=>{
        //user registeration
        fname.val('');
        lname.val('');
        email.val('');
        pass.val('');
        // Contact Form
        cName.val('');
        cEmail.val('');
        cMsg.val('');
        //
        LogEmail.val('');
        password.val('');
        
    }
    // Register Method
    Register.submit((e) => {
        e.preventDefault();
        fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                fname: fname.val(),
                lname: lname.val(),
                email: email.val(),
                password: pass.val()
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data.error) {
                if (data.result.ok == 1 && data.result.n == 1) {
                    console.log("Main is successfully working data is going success");
                }
            }
            resetInput();
            alert("Registration Successful, ThankYou");
        })

    });
    // Contact Form Submission
    Contact.submit((e) =>{
        e.preventDefault();
        fetch('/contact',{
            method : 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                name: cName.val(),
                email: cEmail.val(),
                Message : cMsg.val()
            })  
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data.error) {
                if (data.result.ok == 1 && data.result.n == 1) {
                    console.log("Main is successfully working data is going success");
                }
            }
            resetInput();
            alert("We have got your Response, ThankYou");
        })
    })
    // Login form
    loginForm.submit((e)=>{
        e.preventDefault();
        fetch('/login', {
            method : "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: LogEmail.val(),
                password : password.val()
            })
        }).then((response) => {
            return response.json();
            
        }).then((data) => {
            if (!data.error) {
                if (data.result.ok == 1 && data.result.n == 1) {
                    console.log("Main is successfully working data is going success");
                }
            }
            // resetInput();
            // alert("We have got your Response, ThankYou");
        })
    });
});
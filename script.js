const splash = document.querySelector(".splash-screen");
const app = document.getElementById("app");

splash.addEventListener("animationend", async () => {
splash.style.display = "none";

try{
    const response = await fetch("signup.html");

    if(!response.ok){
        throw new Error("Network response was not ok");
    }
    const html = await response.text();
    app.innerHTML = html;

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginBtn = document.getElementById("show-login");
    const signupBtn = document.getElementById("show-signup");

    loginBtn.addEventListener("click", () => {
        loginBtn.classList.add("active");
        signupBtn.classList.remove("active");
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    });

    signupBtn.addEventListener("click", () => {
        signupBtn.classList.add("active");
        loginBtn.classList.remove("active");
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
    });

} catch (error) {
        console.error("There has been a problem with your fetch operation:",error);
    }
});



    
        
        

        // Move the toggle logic here, after the HTML is loaded
        
        

        
      
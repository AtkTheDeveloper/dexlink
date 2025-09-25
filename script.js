import {openDatabase, createUser, getUser} from "./modules/db.js";

const splash = document.querySelector(".splash-screen");
const app = document.getElementById("app");

// Helper to show notes interface
function showNotes() {
    app.innerHTML = `<iframe 
        src="./notes/notes.html" 
        style="width: 100vw; height: 100vh; border: none; overflow: hidden;" 
        scrolling="no">
    </iframe>`;
}

splash.addEventListener("animationend", async () => {
    splash.style.display = "none";

    // Check login status
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showNotes();
        return;
    }

    try {
        const response = await fetch("signup.html");
        if (!response.ok) throw new Error("Network response was not ok");
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

        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const user = {
                username: form.username.value.trim(),
                email: form.email.value.trim(),
                password: form.password.value.trim(),
                createdAt: new Date().toISOString()
            };
            try {
                await openDatabase();
                await createUser(user);
                alert("User created successfully!");
            } catch (error) {
                console.error("Error creating user:", error);
            }
            form.reset();
        });

        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const username = form.username.value.trim();
            const password = form.password.value.trim();

            try {
                await openDatabase();
                const user = await getUser(username, password);
                alert("Login successful!");

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInUser', user.username);

                showNotes();
            } catch (error) {
                console.log("Error logging in:", error);
            }
            form.reset();
        });

    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("loginError");
  
    // Array to store username and password (for demonstration purposes)
    const users = [
      { username: "LachlanDwyer", password: "Falcon" },
      { username: "TerryTsoukalas", password: "Fortniteisbad" },
      { username: "Admin", password: "Compass" },
      { username: "LalitaGracePrestonHaira", password: "Hell0!" },
    ];
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = usernameInput.value;
      const password = passwordInput.value;
  
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
        // Store authentication status in localStorage
        localStorage.setItem("authenticated", true);
        localStorage.setItem("name", usernameInput.value);
        window.location.href = "index.html"; // Redirect to dashboard or authenticated page
        alert("Successfully Signed In!");
      } else {
        loginError.textContent = "Invalid username or password";
      }
    });
  });
  
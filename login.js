document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("loginError");
  
    // Array to store username and password (for demonstration purposes)
    const users = [
      { username: "user1", password: "pass1" },
      { username: "user2", password: "pass2" },
      { username: "user3", password: "pass3" },
    ];
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = usernameInput.value;
      const password = passwordInput.value;
  
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
        // Store authentication status in localStorage
        localStorage.setItem("authenticated", true);
        window.location.href = "home.html"; // Redirect to dashboard or authenticated page
        alert("Successfully Signed In!");
      } else {
        loginError.textContent = "Invalid username or password";
      }
    });
  });
  
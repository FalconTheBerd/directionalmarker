document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");
  
    logoutButton.addEventListener("click", function () {
      // Clear authentication status in localStorage on logout button click
      localStorage.removeItem("authenticated");
      window.location.href = "login.html"; // Redirect to login page after logout
    });
  });
  
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");
  
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("authenticated");
      window.location.href = "login.html";
    });
  });
  
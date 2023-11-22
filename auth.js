document.addEventListener("DOMContentLoaded", function () {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated || authenticated !== "true") {
      window.location.href = "home.html"; // Redirect back to login page if not authenticated
    }
  });
  
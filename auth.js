document.addEventListener("DOMContentLoaded", function () {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated || authenticated !== "true") {
      window.location.href = "index.html";
    }
  });
  
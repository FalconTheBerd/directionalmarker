document.addEventListener("DOMContentLoaded", function () {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated || authenticated !== "true") {
      window.location.href = "index.html"; // Redirect back to login page if not authenticated or value not in the array
    setTimeout(() => {
      alert("Not Logged In");
    }, 200); // This will delay the execution by 2000 milliseconds (2 seconds)
    }
  });
  
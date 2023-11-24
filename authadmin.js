document.addEventListener("DOMContentLoaded", function () {
  const allowedValues = ["Admin"]; // Replace these with your allowed authentication values
  const name = localStorage.getItem("name");

  if (!name || !allowedValues.includes(name)) {
    window.location.href = "index.html"; // Redirect back to login page if not authenticated or value not in the array
  }
});

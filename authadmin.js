document.addEventListener("DOMContentLoaded", function () {
  const allowedValues = ["Admin"]; // Replace these with your allowed authentication values
  const name = localStorage.getItem("name");

  if (!name || !allowedValues.includes(name)) {
    window.location.href = "index.html"; // Redirect back to login page if not authenticated or value not in the array
    setTimeout(() => {
      alert("Not Logged In");
    }, 200); // This will delay the execution by 2000 milliseconds (2 seconds)
    
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const permission = localStorage.getItem("permissionLevel");

  // Check if permission is null (key doesn't exist) or not a valid number
  if (permission === null || isNaN(Number(permission))) {
    // Handle invalid permission scenario (e.g., unexpected value in localStorage)
    console.error("Unexpected permission value in localStorage:", permission);
    // Optionally redirect or display an error message here
    return; // Exit the function if permission is invalid
  }

  // Convert permission to a number for numerical comparison
  const permissionLevel = Number(permission);

  if (permissionLevel < 2) {
    window.location.href = "index.html";
    setTimeout(() => {
      alert("Not Logged In");
    }, 200);
  }
});

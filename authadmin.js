document.addEventListener("DOMContentLoaded", function () {
  const permission = localStorage.getItem("permissionLevel");

  if (permission === null || isNaN(Number(permission))) {
    console.error("Unexpected permission value in localStorage:", permission);
    return;
  }

  const permissionLevel = Number(permission);

  if (permissionLevel < 2) {
    window.location.href = "index.html";
    setTimeout(() => {
      alert("Not Logged In");
    }, 200);
  }
});

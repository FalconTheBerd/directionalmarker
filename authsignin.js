document.addEventListener("DOMContentLoaded", function () {
  const permission = localStorage.getItem("permissionLevel");

  if (permission === null || isNaN(Number(permission)) || Number(permission) < 1) {
    window.location.href = "index.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const loginButton = document.getElementById("loginButton");

  const users = [
    { username: "LachlanDwyer", password: "Falcon" },
    { username: "TerryTsoukalas", password: "Fortniteisbad" },
    { username: "Admin", password: "Compass" },
    { username: "LalitaGracePrestonHaira", password: "Hell0!" },
  ];

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user && termsCheckbox.checked) {
      localStorage.setItem("authenticated", true);
      localStorage.setItem("name", usernameInput.value);
      window.location.href = "index.html";
      alert("Successfully Signed In!");
    } else {
      alert("Please accept the T&C and Privacy Policy");
    }
  });

  termsCheckbox.addEventListener('change', function () {
    loginButton.disabled = !termsCheckbox.checked;
  });
});

  
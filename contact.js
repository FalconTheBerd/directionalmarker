document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("messageInput").value;

    const formData = {
      username: name,
      email: email,
      message: message,
    };

    sendToDiscordWebhook(formData);
  });

  function sendToDiscordWebhook(data) {
    const webhookURL = "https://discord.com/api/webhooks/1176800295163015188/CamNAnY5OojJGVbgGnxnaFIk4zIN1a2bVeL6a4IRDE6xvVYx1ueH-dCZ5gDi-pMtl86i";

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `New message from ${data.username} (${data.email}): ${data.message}`,
      }),
    })
    .then(response => {
      if (response.ok) {
        alert("Message sent successfully!");
        window.location.reload(); // Reload the page after success
      } else {
        throw new Error("Failed to send message");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to send message. Please try again later.");
      window.location.reload(); // Reload the page after error
    });
  }
});

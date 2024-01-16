// Function to hash the password using SHA-256
function hashPassword(password) {
  const sha256 = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return sha256;
}

// Function to get basic device information
function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  return { userAgent, platform };
}

// Function to get the client's IP address using an external service
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return null;
  }
}

// Function to get the client's geolocation based on the IP address using an external service
async function getClientGeolocation(ip) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const loginButton = document.getElementById("loginButton");

  const users = [
    { username: "LachlanDwyer", password: "beac5ecc982f82ee4d00161c68a989becb1aa8ca90980c87e07db167113c2dfd"},
    { username: "TerryTsoukalas", password: "8f9be23677a0c32b6c2a946ea50d1673525d4740870b245a064f59c6b24c6422" },
    { username: "Admin", password: "fd3f8cb72c0de9c620d239358caacc7b8b5e7420b80e54eab4b90c85de8f1d02" },
    { username: "LalitaGracePrestonHaira", password: "5333a19ac109063be6ab54538de3191d6ed18e094c4f4409f65409feef171ca7" },
    { username: "Guest", password: "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a"},
  ];

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = hashPassword(passwordInput.value); // Hash the input password for comparison

    const user = users.find(u => u.username === username && u.password === password);

    if (user && termsCheckbox.checked) {
      const clientIP = await getClientIP(); // Get the client's IP address
      const deviceInfo = getDeviceInfo(); // Get device information
      const clientGeolocation = await getClientGeolocation(clientIP); // Get geolocation data

      const payload = {
        content: `Successful Sign In:
        Username: ${username}
        User-Agent: ${deviceInfo.userAgent}
        Platform: ${deviceInfo.platform}
        IP: ${clientIP}
        Geolocation:
          City: ${clientGeolocation.city}
          Region: ${clientGeolocation.region}
          Country: ${clientGeolocation.country_name}
          Continent: ${clientGeolocation.continent_code}
          Postal Code: ${clientGeolocation.postal}
          Latitude: ${clientGeolocation.latitude}
          Longitude: ${clientGeolocation.longitude}
          Timezone: ${clientGeolocation.timezone}
          Currency: ${clientGeolocation.currency} (${clientGeolocation.currency_name})`
    };

      // Replace 'YOUR_DISCORD_WEBHOOK_URL' with your actual Discord webhook URL
      const webhookURL = 'https://discord.com/api/webhooks/1182602607575978025/QZbCoN4tO3hk-60j37ZPJJQvTSnnqKssGli1twy9dKj-j0pc7IZiydzVk48g06tzy1Op';

      // Send payload to the Discord webhook using fetch
      fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(() => {
        localStorage.setItem("authenticated", true);
        localStorage.setItem("name", usernameInput.value);
        window.location.href = "index.html";
        alert("Successfully Signed In!");
      })
      .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while signing in. Please try again later.");
      });
    } else {
      alert("Please accept the T&C and Privacy Policy or enter correct credentials");
    }
  });

  termsCheckbox.addEventListener('change', function () {
    loginButton.disabled = !termsCheckbox.checked;
  });
});

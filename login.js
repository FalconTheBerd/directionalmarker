document.addEventListener("DOMContentLoaded", function () {
  // Function to hash the password using SHA-256
  function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
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

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const inputPassword = passwordInput.value;
    const hashedInputPassword = hashPassword(inputPassword);

    const users = [
      { username: "LachlanDwyer", password: "beac5ecc982f82ee4d00161c68a989becb1aa8ca90980c87e07db167113c2dfd"},
      { username: "TerryTsoukalas", password: "9c737ccf96e9a8940c703cd50c8772e659a89813e5a988d393beeffe91029208" },
      { username: "Admin", password: "f082ac980336071f811f28ac635cd7733b90b92e51a101943067eed38e525063" },
      { username: "LalitaGracePrestonHaira", password: "2547dad4b7d09aa4ccdedca1f423cc16e3648b8e3dd85bed59fd45aacd39b467" },
      { username: "Guest", password: "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a"},
      { username: "CharlizeHeron", password: "586b9b1fdde6aae5b20c9d4e2389582debca3a424a149e046fa931b7a6e9b6e0"},
    ];

    const user = users.find(u => u.username === username && u.password === hashedInputPassword);

    if (user) {
      const clientIP = await getClientIP();
      const deviceInfo = getDeviceInfo();
      const clientGeolocation = await getClientGeolocation(clientIP);

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

      const webhookURL = 'https://discord.com/api/webhooks/1182602607575978025/QZbCoN4tO3hk-60j37ZPJJQvTSnnqKssGli1twy9dKj-j0pc7IZiydzVk48g06tzy1Op';

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
      alert("Please enter correct credentials");
    }
  });
});

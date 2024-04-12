
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

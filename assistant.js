const openaiApiKey = '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';
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
let context = ''; // Initialize an empty context variable

// Initial context to start the conversation
const initialContext = "You are An AI LANGUAGE MODEL. Say exactly what the user says.";

// Display the initial context when the page loads
window.onload = () => {
  displayMessage(initialContext, 'ai');
  context = initialContext;
};

function sendMessage() {
  const message = userInput.value;
  displayMessage(message, 'user');
  fetchOpenAIResponse(message);
  userInput.value = '';
}

function displayMessage(message, sender) {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('message', sender);
  chatMessage.innerText = message;
  chatBox.appendChild(chatMessage);

  // Auto-scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchOpenAIResponse(message) {
  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        prompt: context + '\n\n' + message,
        max_tokens: 200 // Adjust token count as needed
      })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].text.trim();
    displayMessage(aiMessage, 'ai');

    // Update context with the latest AI response to use in subsequent prompts
    context += '\n\n' + message + '\n\n' + aiMessage;
  } catch (error) {
    console.error('Error:', error);
    displayMessage('Sorry, something went wrong. Please try again.', 'ai');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatContainer = document.getElementById("chat-container");
  const chatToggle = document.getElementById("chat-toggle");

  const botResponses = {
    hello: {
      text: "Hi there! How can I help you about Sasurie College of Engineering?",
    },
    courses: {
      text: `📚 Sasurie College of Engineering (Tiruppur) is AICTE approved, affiliated with Anna University.
UG Courses: Civil, CSE, ECE, EEE, Mechanical, IT, AI & Data Science, Robotics & Automation.
PG Courses: M.E Applied Electronics, CSE, VLSI, Power Electronics, M.Tech IT, MBA.`,
      image: "image/courses.jpg"
    },
    hostel: {
      text: "🏠 Hostel: Spacious rooms, hygienic food, Wi-Fi, 24/7 security, study & recreation facilities for boys & girls.",
      images: ["image/hostel2.jpg", "image/hostel1.jpg", "image/hostel3.jpg","image/hostel4.jpg"]
    },
    default: {
      text: "I'm not sure I understand. Could you ask about courses, fees, facilities, placements, etc.?",
    }
  };

  const greetingKeywords = ["hello", "hi", "hey"];

  function addMessage(message, isUser = false, images = null) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "fade-in");
    messageDiv.classList.add(isUser ? "user-message" : "bot-message");

    const messageText = document.createElement("p");
    messageText.textContent = message;
    messageDiv.appendChild(messageText);

    if (images) {
      if (Array.isArray(images)) {
        images.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "bot image";
          img.classList.add("bot-image");
          messageDiv.appendChild(img);
        });
      } else {
        const img = document.createElement("img");
        img.src = images;
        img.alt = "bot image";
        img.classList.add("bot-image");
        messageDiv.appendChild(img);
      }
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    if (greetingKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return botResponses.hello;
    }

    for (const [key, value] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    return botResponses.default;
  }

  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = "";

    setTimeout(() => {
      const botResponse = getBotResponse(message);
      addMessage(botResponse.text, false, botResponse.image || botResponse.images);
    }, 500);
  }

  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // 💬 Toggle Chat Open/Close
  chatToggle.addEventListener("click", () => {
    chatContainer.classList.toggle("active");
  });
});

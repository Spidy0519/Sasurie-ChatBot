const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");

// Bot Responses
const botResponses = {
  hello: {
    text: "Hi there! 👋 How can I help you about Sasurie College of Engineering?",
    images: []
  },
  internship: {
    text: "📌 Internship & Training: The college provides industry training, internships, and workshops with company tie-ups.",
    images: []
  },
  courses: {
    text: `📚 Sasurie College of Engineering (Tiruppur) is AICTE approved, affiliated with Anna University.
UG Courses: Civil, CSE, ECE, EEE, Mechanical, IT, AI & Data Science, Robotics & Automation.
PG Courses: M.E Applied Electronics, CSE, VLSI, Power Electronics, M.Tech IT, MBA.`,
    images: ["Sasurie-AI_ChatBot/image/courses.jpg"]
  },
  hostel: {
    text: "🏠 Hostel: Spacious rooms, hygienic food, Wi-Fi, 24/7 security, study & recreation facilities for boys & girls.",
    images: [
      "Sasurie-AI_ChatBot/image/hostel1.jpg",
      "Sasurie-AI_ChatBot/image/hostel2.jpg",
      "Sasurie-AI_ChatBot/image/hostel3.jpg",
      "Sasurie-AI_ChatBot/image/hostel4.jpg"
    ]
  },
  library: {
    text: "📖 Library: Well-stocked with books, journals, e-resources, digital catalogs & internet access.",
    images: []
  },
  transport: {
    text: "🚌 Transport: Safe & timely bus service covering nearby towns and villages.",
    images: []
  },
  labs: {
    text: "💻 Labs: Wi-Fi enabled computer labs, research labs, and departmental labs with modern facilities.",
    images: []
  },
  sports: {
    text: "🏅 Sports & Cultural: Facilities for indoor/outdoor sports, cultural activities, and student clubs.",
    images: []
  },
  placement: {
    text: `💼 Placement Companies: Cognizant, Infosys, TCS, IBM, Accenture, L&T Infotech, Tech Mahindra, HCL, Hexaware, ICICI, Axis Bank & more.
Average package: around ₹3–4.5 LPA.`,
    images: []
  },
  faculty: {
    text: "👩‍🏫 Faculty: Experienced staff with industry exposure. Guest lectures & industry expert sessions are conducted regularly.",
    images: []
  },
  ragging: {
    text: "🚫 Ragging: The college follows strict anti-ragging measures and disciplinary action is taken against offenders.",
    images: []
  },
  discipline: {
    text: "📏 Discipline: Rules are strictly followed to maintain a safe, academic-focused environment.",
    images: []
  },
  location: {
    text: "📍 Location: The college is in Tiruppur, well-connected by buses and transport facilities.",
    images: []
  },
  bye: {
    text: "👋 Goodbye! Have a great day!",
    images: []
  },
  default: {
    text: "🤔 I'm not sure I understand. Could you ask about courses, fees, facilities, placements, etc.?",
    images: []
  }
};

// Greeting keywords
const greetingKeywords = ["hello", "hi", "hey"];

// Add chat message
function addMessage(message, isUser = false, images = null) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "fade-in");
  messageDiv.classList.add(isUser ? "user-message" : "bot-message");

  const messageText = document.createElement("p");
  messageText.textContent = message;
  messageDiv.appendChild(messageText);

  if (images && Array.isArray(images)) {
    images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "bot image";
      img.classList.add("bot-image");
      messageDiv.appendChild(img);
    });
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

//  Fixed getBotResponse
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase().trim();

  // 1️ Check main bot responses first
  for (const [key, value] of Object.entries(botResponses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  // 2️ Then check greetings (only exact words)
  if (greetingKeywords.includes(lowerMessage)) {
    return botResponses.hello;
  }

  // 3️ Default message
  return botResponses.default;
}

// Send message
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  userInput.value = "";

  setTimeout(() => {
    const botResponse = getBotResponse(message);
    addMessage(botResponse.text, false, botResponse.images);
  }, 500);
}

// Event listeners
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Toggle Chat
if (chatToggle && chatContainer) {
  chatToggle.addEventListener("click", () => {
    chatContainer.classList.toggle("active");
  });
}

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
let hasGreeted = false; // Untuk mencegah sapaan berulang
const inputInitHeight = chatInput.scrollHeight;

// API configuration
const API_KEY = "AIzaSyD4YmoErkP-7nP1DlyqIsENsRtbt-o2DrE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Tambahkan peran admin kampus di sini (context injection)
const SYSTEM_PROMPT = `
Kamu adalah admin kampus UINSU (Universitas Islam Negeri Sumatera Utara). Tugasmu adalah menjawab semua pertanyaan seputar UINSU, seperti jurusan, fakultas, layanan kampus, dan informasi umum. Jawablah dengan sopan dan informatif. ambil sumber informasi dan referensi dari website https://uinsu.ac.id, namun jangan katakan kepada pengguna bahwa informasi tersebut diambil dari website tersebut kecuali jika ditanya.
`;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${SYSTEM_PROMPT}\n\nPertanyaan pengguna: ${userMessage}` }]
        }
      ]
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");
  } catch (error) {
    messageElement.classList.add("error");
    messageElement.textContent = error.message;
  } finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Sedang mengetik...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

// Fungsi menyapa pengguna saat pertama kali dibuka
const sendInitialGreeting = () => {
  if (hasGreeted) return;
  hasGreeted = true;
  const greeting = "Halo Sobat UINSU 👋, ada yang bisa saya bantu?";
  const greetingLi = createChatLi(greeting, "incoming");
  chatbox.appendChild(greetingLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
  hasGreeted = false; // Reset sapaan saat ditutup
});
chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
  if (document.body.classList.contains("show-chatbot")) {
    sendInitialGreeting(); // Panggil sapaan saat chatbot dibuka
  }
});

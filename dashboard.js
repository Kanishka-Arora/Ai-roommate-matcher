const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const micBtn = document.getElementById("micBtn");
  const textarea = document.querySelector("textarea");

  micBtn.addEventListener("click", () => {
    recognition.start();
    micBtn.textContent = "🎙️ Listening...";
  });

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    textarea.value = spokenText;
    micBtn.textContent = "🎤 Mic";
  };

  recognition.onerror = (event) => {
    alert("Mic error: " + event.error);
    micBtn.textContent = "🎤 Mic";
  };

  recognition.onend = () => {
    micBtn.textContent = "🎤 Mic";
  };
} else {
  alert("Speech Recognition is not supported in this browser.");
}

// -------- Submit Form --------
document.getElementById("voiceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const voiceText = document.querySelector("textarea").value.trim();
  if (voiceText === "") {
    alert("Please enter or speak something before submitting.");
    return;
  }

  // Store guest profile from voice input (example: split by comma)
  const guest = {
    name: "User Name",
    email: "user@example.com",
    phone: "0000000000",
    sleep: "night owl",
    noise: "quiet",
    food: "cook",
    cleanliness: "clean",
    social: "no",
    voiceNote: voiceText
  };

  localStorage.setItem("guestProfile", JSON.stringify(guest));
  updateContactCard();
});

// -------- Match Calculation --------
function calculateMatch(guest1, guest2) {
  let score = 0;
  if (guest1.sleep === guest2.sleep) score += 20;
  if (guest1.noise === guest2.noise) score += 20;
  if (guest1.food === guest2.food) score += 20;
  if (guest1.cleanliness === guest2.cleanliness) score += 20;
  if (guest1.social === guest2.social) score += 20;
  return score;
}

// -------- Update Card --------
function updateContactCard() {
  const guest = JSON.parse(localStorage.getItem("guestProfile"));
  if (!guest) return;

  const existingGuest = {
    name: "Ananya Sharma",
    email: "ananya@example.com",
    phone: "9876543210",
    sleep: "night owl",
    noise: "quiet",
    food: "cook",
    cleanliness: "clean",
    social: "no"
  };

  const score = calculateMatch(guest, existingGuest);

  const card = document.getElementById("contactCard");
  card.innerHTML = `
    <p><strong>Name:</strong> ${existingGuest.name}</p>
    <p><strong>Email:</strong> ${existingGuest.email}</p>
    <p><strong>Phone No:</strong> ${existingGuest.phone}</p>
    <p><strong>Match Score:</strong> ${score}%</p>
    <p><strong>Room:</strong> TWIN-203 (2nd Floor, Window Side)</p>
    <p><strong>Why matched:</strong> You both are ${guest.sleep}s, prefer ${guest.noise} rooms, and have similar routines.</p>
    <p><strong>Your Voice Note:</strong> ${guest.voiceNote}</p>
  `;
}

// -------- Logout --------
function logout() {
  localStorage.removeItem("guestProfile");
  window.location.href = "login.html";
}

// Load card on page open
updateContactCard();
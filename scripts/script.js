const EMOJIS = ["🎉", "🎆", "🎇", "🌟", "✨"];

function createFirework() {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const size = Math.random() * 100 + 50;
  const duration = Math.random() * 1000 + 500;
  const element = document.createElement("div");
  element.innerHTML = emoji;
  element.classList.add("circle");
  element.style.fontSize = `${size}px`;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  document.getElementById("fireworks").appendChild(element);
  setTimeout(() => element.remove(), duration);
}

setInterval(createFirework, 300);

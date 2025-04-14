function startChat() {
  const name = document.getElementById('nameInput').value.trim();
  const messageBox = document.getElementById('ghostMessage');
  const chatBox = document.getElementById('chatBox');
  const sound = document.getElementById('creepySound');

  if (name === "") {
    alert("Naam to daalo...");
    return;
  }

  const messages = [
    `${name}... main tumhare peeche hoon.`,
    `${name}, tumhari aatma yahan se guzri thi.`,
    `${name}, aaj raat kuch ajeeb hoga.`,
    `Darwaza mat kholna, ${name}...`,
    `Main tumhara intezaar kar raha hoon, ${name}...`
  ];

  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  messageBox.textContent = randomMsg;
  chatBox.classList.remove('hidden');
  sound.play();
}

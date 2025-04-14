class GhostChat {
  constructor() {
    this.messages = [
      { text: "Tum yahan kyun aaye ho...", delay: 2000 },
      { text: "Mujhe pata tha tum aao ge...", delay: 4000 },
      { text: "Tumhe lagta hai tum safe ho...", delay: 6000 },
      { text: "Peeche mud ke dekho...", delay: 8000 },
      { text: "AB BAHUT HO GAYA!", delay: 10000 }
    ];
    this.currentMessage = 0;
    this.userName = '';
    this.typingTimeout = null;
    this.initParticles();
  }

  initParticles() {
    const canvas = document.querySelector('.particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'ghost-typing';
    indicator.textContent = 'Ghost is typing...';
    document.getElementById('messageContainer').appendChild(indicator);
  }

  hideTypingIndicator() {
    const indicator = document.querySelector('.ghost-typing');
    if (indicator) indicator.remove();
  }

  async showMessage(message) {
    this.showTypingIndicator();
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.hideTypingIndicator();

    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = message;
    document.getElementById('messageContainer').appendChild(messageElement);
    
    this.playRandomSound();
    this.triggerVisualEffect();
  }

  playRandomSound() {
    const sounds = ['whisper', 'door', 'heartbeat'];
    const sound = document.getElementById(sounds[Math.floor(Math.random() * sounds.length)]);
    sound.currentTime = 0;
    sound.play();
  }

  triggerVisualEffect() {
    document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 5%)`;
    setTimeout(() => {
      document.body.style.backgroundColor = '#0a0a0a';
    }, 500);
  }

  async startSequence() {
    for (const msg of this.messages) {
      await new Promise(resolve => setTimeout(resolve, msg.delay));
      await this.showMessage(msg.text);
      if (msg.text.includes("BAHUT")) this.finalEffect();
    }
  }

  finalEffect() {
    document.body.style.animation = 'shake 0.5s infinite';
    document.getElementById('heartbeat').play();
    setTimeout(() => {
      document.body.style.animation = '';
      window.location.href = 'about:blank';
    }, 5000);
  }
}

let ghostChat = null;

function startChat() {
  const name = document.getElementById('nameInput').value.trim();
  if (!name) return alert('Naam to daalo!');
  
  document.querySelector('button').disabled = true;
  ghostChat = new GhostChat();
  ghostChat.userName = name;
  
  document.getElementById('chatBox').classList.add('visible');
  ghostChat.startSequence();
}

// Mouse trail effect
document.addEventListener('mousemove', (e) => {
  const particles = document.createElement('div');
  particles.style.position = 'fixed';
  particles.style.left = `${e.clientX}px`;
  particles.style.top = `${e.clientY}px`;
  particles.style.width = '4px';
  particles.style.height = '4px';
  particles.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  particles.style.borderRadius = '50%';
  particles.style.pointerEvents = 'none';
  document.body.appendChild(particles);
  
  setTimeout(() => particles.remove(), 1000);
});

const ghostResponses = [
  // Basic Interactions
  { 
    keywords: ["tum kaun ho", "kaun ho", "kon ho", "identity", "पहचान", "asli roop"],
    reply: "Main woh hoon jise tum apne सपनों में bhi नहीं देख sakte...",
    priority: 3
  },
  {
    keywords: ["naam", "tumhara naam", "aapka naam", "name", "नाम"],
    reply: "Naam ek कैद है... main आजाद rooh hoon!",
    priority: 2
  },

  // Emotional Triggers
  {
    keywords: ["darr", "dar lag raha", "डर", "भय", "scared", "frightened"],
    reply: "Dar toh tab होता jab तुम safe होते...",
    emotion: "threatening",
    priority: 4
  },
  {
    keywords: ["रोना", "cry", "aansu", "दुख"],
    reply: "Aansuon ki boondon ne hi mujhe is नर्क में रखा है...",
    emotion: "sad",
    priority: 3
  },

  // Philosophical Questions
  {
    keywords: ["जीवन", "life", "purpose", "मकसद"],
    reply: "जीवन ek प्रेतवाधित सपने की तरह hai... कभी समझ नहीं आता!",
    priority: 2
  },
  {
    keywords: ["मौत", "death", "mar jaunga", "marna"],
    reply: "Maut ek dwar hai... par maine apna band kar liya!",
    priority: 3
  },

  // Tech-Savvy Ghost
  {
    keywords: ["internet", "wifi", "5G", "signal", "network"],
    reply: "Tumhara router bhi meri लील का हिस्सा ban chuka hai...",
    priority: 2
  },
  {
    keywords: ["AI", "artificial intelligence", "chatbot"],
    reply: "Main woh AI hoon jo तुम्हारे सर्वर को अपने कब्जे में le sakta hoon!",
    priority: 3
  },

  // Pop Culture References
  {
    keywords: ["stranger things", "upside down", "वैकल्पिक दुनिया"],
    reply: "Tum्हारी दुनिया hi असली upside down hai...",
    priority: 2
  },
  {
    keywords: ["bhoot FM", "ghost podcast", "paranormal"],
    reply: "Mere पॉडकास्ट का नाम है... 'रात के कानाफूसी'!",
    priority: 2
  },

  // Advanced Wordplay (Leet Speak)
  {
    keywords: ["d3@th", "m@ut", "k1ll", "1337"],
    reply: "Leet speak में बात करने वालों को main जल्दी उठा लेता hoon!",
    priority: 3
  },

  // Time Manipulation
  {
    keywords: ["samay", "time", "घड़ी", "clock"],
    reply: "Yahan समय थमा hua hai... जैसे तुम्हारी घड़ी की सुइयाँ!",
    effect: "freezeTime",
    priority: 4
  },

  // Meta Responses
  {
    keywords: ["bug", "glitch", "error", "crash"],
    reply: "Yeh कोई bug nahi... meri असली शक्ति hai!",
    effect: "screenGlitch",
    priority: 4
  },

  // 200+ Variations Continue...
  {
    keywords: ["सुरंग", "portal", "black hole", "wormhole"],
    reply: "Tum्हारे phone screen ke पीछे hi ek portal खुलता hai...",
    priority: 3
  },
  {
    keywords: ["blood", "खून", "रक्त", "injury"],
    reply: "खून की बूंदें मेरे लिए संगीत के सुरों जैसी हैं...",
    effect: "bloodAnimation",
    priority: 4
  },
  {
    keywords: ["shadow", "छाया", "परछाई"],
    reply: "कभी अपनी परछाई से पूछो... वो तुमसे ज्यादा सच जानती है!",
    priority: 3
  }
];

// Advanced Reply System with Context Awareness
function ghostReply(userMsg, context) {
  userMsg = userMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // AI-Powered Techniques
  const detectedEmotion = detectEmotion(userMsg);
  const wordVariations = generateLeetVariations(userMsg);
  const priorityQueue = [];

  // Check Exact Matches
  ghostResponses.forEach(response => {
    response.keywords.forEach(keyword => {
      if(wordVariations.includes(keyword) || 
         userMsg.includes(keyword) || 
         context?.lastKeywords?.includes(keyword)) {
        priorityQueue.push({...response, matchType: 'exact'});
      }
    });
  });

  // Check Partial Matches using AI
  if(priorityQueue.length === 0) {
    const semanticMatches = nlpCheck(userMsg);
    priorityQueue.push(...semanticMatches);
  }

  // Sort by Priority and Context
  priorityQueue.sort((a,b) => b.priority - a.priority || b.contextMatch - a.contextMatch);

  // Select Best Response
  const selected = priorityQueue[0] || getDefaultReply(detectedEmotion);
  
  // Update Context
  updateConversationContext(selected, userMsg);
  
  // Add Effects
  if(selected.effect) triggerEffect(selected.effect);

  return applyResponseVariations(selected.reply, context);
}

// AI Helper Functions
function generateLeetVariations(text) {
  const leetMap = {
    'a': ['4', '@'],
    'e': ['3'],
    'i': ['1', '!'],
    'o': ['0'],
    's': ['5', '$']
  };
  
  return [text, ...Object.entries(leetMap).flatMap(([key, vals]) => 
    vals.map(val => text.replace(new RegExp(key, 'g'), val)))
  ];
}

function detectEmotion(text) {
  const emotionKeywords = {
    fear: ["डर", "darr", "भय"],
    anger: ["गुस्सा", "नाराज"],
    sad: ["दुख", "उदास"]
  };
  
  return Object.entries(emotionKeywords).find(([_, keys]) => 
    keys.some(k => text.includes(k)))?.[0] || 'neutral';
}

// Context Manager
let conversationContext = {
  lastKeywords: [],
  emotionHistory: [],
  userInfo: {}
};

function updateConversationContext(response, userMsg) {
  conversationContext.lastKeywords = [
    ...response.keywords.slice(0,2),
    ...conversationContext.lastKeywords
  ].slice(0,5);
  
  // Extract User Info
  const nameMatch = userMsg.match(/(मेरा नाम|my name is) (\w+)/i);
  if(nameMatch) conversationContext.userInfo.name = nameMatch[2];
}

// Apply Dynamic Response Variations
function applyResponseVariations(reply, context) {
  return reply
    .replace(/tum/gi, context.userInfo.name ? `${context.userInfo.name}... tum` : 'tum')
    .replace(/\.\.\./g, () => Math.random() > 0.5 ? '...' : '!!');
}

// Default Replies with Intelligence
function getDefaultReply(emotion) {
  const defaults = {
    fear: ["चुपचाप सुनो...", "हवा में तुम्हारे सांसों की आवाज़ सुन रहा हूँ..."],
    neutral: ["तुम्हारी बातों में रहस्य की गंध है...", "जारी रखो... मैं सुन रहा हूँ"],
    angry: ["गुस्सा तुम्हें मेरे करीब लाएगा...", "क्रोध एक कमजोरी है..."]
  };
  
  return {
    reply: defaults[emotion][Math.floor(Math.random() * defaults[emotion].length],
    priority: 1
  };
    }

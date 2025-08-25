module.exports.config = {
  name: "emojiReply",
  version: "2.2",
  credit: "Raj",
  description: "Funny emoji auto-reply (no prefix)",
  usages: "",
  cooldowns: 3
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, body } = event;
  if (!body) return;

  // Simple emoji regex (unicode range)
  const emojiMatch = body.match(/([\u231A-\uD83E\uDDFF])/g);
  if (!emojiMatch) return;

  const emoji = emojiMatch[0]; // pehla emoji le lo

  const emojiReplies = {
    "😘": [
      "Arre babu, itna pyaar! Dil garden garden ho gaya! 🌸😂",
      "Mwah mwah! Yeh kaunsa naye pyaar ka signal hai? 💋😂",
      "Bas kar babu, sharm aayegi! 🙈💖",
      "Lagta hai babu full romantic mode me hai! 💞🔥"
    ],
    "😒": [
      "Ye kya nakhre hai babu? Shahzada mode on hai kya? 👑😂",
      "Itni attitude? Lagta hai data pack khatam ho gaya! 📵😆",
      "Babu, aise muh mat bana, varna statue ban jayega! 🗿😂",
      "Ladka full ignore mode me chala gaya! 🚶‍♂️😒"
    ],
    "😁": [
      "Babu full khush lag raha hai! Koi special baat hai kya? 😁🎉",
      "Itni badi smile? Lagta hai chhupa treasure mil gaya! 🏆😁",
      "Babu ke dant chamak rahe hain! Kya toothpaste use karte ho? 🦷😂",
      "Hasi aise hi bani rahe! Dunia ko positive energy milti rahe! 😁💖"
    ]
    // 👀, 😈, 💋, 🥶, 😹, 👊 wagairah bhi add kar sakte ho
  };

  if (emojiReplies[emoji]) {
    const replies = emojiReplies[emoji];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    return api.sendMessage(randomReply, threadID, event.messageID);
  }
};

module.exports.run = async function () {
  // ye command koi prefix use nahi karti
};

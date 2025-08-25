const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "given prefix detail",
  commandCategory: "Dành cho Admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭") { 
    return api.sendMessage("Again change credit to 𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", threadID, messageID) 
  }

  function out(text, attachPath = null) {
    if (attachPath) {
      api.sendMessage({
        body: text,
        attachment: fs.createReadStream(attachPath)
      }, threadID, messageID);
    } else {
      api.sendMessage(text, threadID, messageID);
    }
  }

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  var arr = ["mpre","mprefix","prefix", "dấu lệnh", "prefix của bot là gì","daulenh", "duong", "what prefix", "freefix", "what is the prefix", "bot dead", "bots dead", "where prefix", "what is bot", "what prefix bot", "how to use bot" ,"how use bot", "where are the bots","bot not working","bot is offline","where prefix","prefx","prfix","prifx","perfix","bot not talking","where is bot"];

  arr.forEach(async i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() || body === i || str === body) {
      const prefix = threadSetting.PREFIX || global.config.PREFIX;

      // === ভিডিও ডাউনলোড ===
      const fileId = "1004jFpAl99YWrDc8xwnK4U1MsySe7fU0"; // তোমার Drive video fileId
      const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const savePath = path.join(__dirname, "prefix_video.mp4");

      try {
        const response = await axios({ url, method: "GET", responseType: "stream" });
        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);

        writer.on("finish", () => {
          const msg = `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

This Is My Prefix ⇉ [ ${prefix} ]

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

╭──────╯🌙╰──────╮
✨.  🌺 𝗢𝗪𝗡𝗘𝗥 👑        ✨
╰──────╮💫╭──────╯

NAME: ☞ 💙⎯͢⎯⃝  𝑵𝑲 𝑬𝑫𝑰𝑻𝑶𝑹⎯͢⎯⃝💜🪽

✨ 𝑹𝒆𝒍𝒂𝒕𝒊𝒐𝒏𝒔𝒉𝒊𝒑 𝑺𝒕𝒂𝒕𝒖𝒔 ✨
❤️ 𝐍𝐊 𝐄𝐃𝐈𝐓𝐎𝐑 💞 + 💖 𝐍𝐢𝐡𝐚𝐫𝐢𝐤𝐚 𝐒𝐢𝐧𝐠𝐡 💖
🌹 𝑭𝒐𝒓𝒆𝒗𝒆𝒓 𝑻𝒐𝒈𝒆𝒕𝒉𝒆𝒓 🌹
  

============================


✧✦ 👑 OWNER CONTACT LINK👑 ✧✦⋆
📘 Facebook ➝ https://www.facebook.com/profile.php?id=61577417285926
📸 Instagram ➝ https://www.instagram.com/nk_lovely_143_1?igsh=OXY4eDBsbzEzMnVr==
💬 Telegram ➝ @NK2650

⋆✦✧✦⋆━━━━━━━━━━━━━━━━⋆✦✧✦⋆`;

          out(msg, savePath);
          // পাঠানো শেষ হলে লোকাল ফাইল ডিলিট
          setTimeout(() => { if (fs.existsSync(savePath)) fs.unlinkSync(savePath); }, 5000);
        });

        writer.on("error", () => out("❌ Video download failed!"));
      } catch (err) {
        console.error(err);
        out("❌ Something went wrong while downloading video!");
      }
    }
  });
};

module.exports.run = async({ event, api }) => {
  return api.sendMessage("error", event.threadID);
};

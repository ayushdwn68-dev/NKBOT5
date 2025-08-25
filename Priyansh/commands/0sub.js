const fs = require("fs");
module.exports.config = {
	name: "sub",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "sub",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("admin")==0 || event.body.indexOf("ADMIN")==0 || event.body.indexOf("Bot banana dikha do ")==0 || event.body.indexOf("Admin")==0) {
		var msg = {
				body: "👋 𝑭𝑶𝑹 𝑨𝑵𝒀 𝑲𝑰𝑵𝑫 𝑶𝑭 𝑯𝑬𝑳𝑷 𝑪𝑶𝑵𝑻𝑨𝑪𝑻 𝑶𝑵 \n\n _______________________\n\n https://chat.whatsapp.com/IlprS6RYsjaLuBG0KgO9f2?mode=ems_share_t \n\n_______________________",
				attachment: fs.createReadStream(__dirname + `/noprefix/sub.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🌹", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

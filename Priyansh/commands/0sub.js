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
	if (event.body.indexOf("Dhoke baaz")==0 || event.body.indexOf("bot admin ")==0 || event.body.indexOf("NK EDITOR")==0 || event.body.indexOf("Dhokebaj")==0) {
		var msg = {
				body: "👋For Any Kind Of Help Contact On Instagram👇👇https://www.instagram.com/nk_lovely_143_1?igsh=OXY4eDBsbzEzMnVr== 😇",
				fs.createReadStream(__dirname + )
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🥳", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

const fs = require("fs");
module.exports.config = {
	name: "mahadev2",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "MrTomXxX", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "mahadev",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Mahadev")==0 || event.body.indexOf("Har har mahadev")==0 || event.body.indexOf("mahakal")==0 || event.body.indexOf("bhole")==0) {
		var msg = {
				body: " ╔═══❀•ೋ° °ೋ•❀═══╗
                  🔱  𝙃𝙖𝙧 𝙃𝙖𝙧 𝙈𝙖𝙝𝙖𝙙𝙚𝙫 🔱
    ॐ नमः शिवाय • ॐ नमः शिवाय
╚═══❀•ೋ° °ೋ•❀═══╝ ",
				attachment: fs.createReadStream(__dirname + `/noprefix/mahakal.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🔱", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

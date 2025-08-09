const fs = require("fs");

module.exports.config = {
  name: "NK",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Arun",
  description: "no prefix",
  commandCategory: "No command marks needed",
  usages: "...",
  cooldowns: 100,
};

module.exports.handleEvent = function({ api, event }) {
  var { threadID, messageID } = event;
  if (!event.body) return;

  let react = event.body.toLowerCase();

  // Keywords जिनके आने पर message send होगा
  if (
    react.includes("NK") ||
    react.includes("boss") ||
    react.includes("admin")
  ) {
    var msg = {
      body:
        "★𝗢𝘄𝗻𝗲𝗿💚💖\n\n" +
        "✦🌸===『*★🌸◉❖𝑁𝐾≛𝐸𝐷𝐼𝑇𝑂𝑅❖◉✦\n\n" +
        "★★᭄𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 𝐋𝐈𝐍𝐊 𝐌𝐄𝐑𝐄 𝐁𝐎𝐒𝐒 𝐊𝐀:\n\n" +
        "✦ https://www.instagram.com/nk_lovely_143_1?igsh=OXY4eDBsbzEzMnVr== ✦\n" +
        "𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐋𝐈𝐍𝐊 𝐌𝐄𝐑𝐄 𝐁𝐎𝐒𝐒 𝐊𝐀😁😋 https://www.facebook.com/profile.php?id=61577417285926\n\n",
      attachment: {
        type: "image",
        payload: {
          url: "https://i.ibb.co/DDkk6qCv/IMG-20250804-WA0735.jpg",
          is_reusable: true,
        },
      },
    };

    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("📷", messageID, (err) => {}, true);
  }
};

// run function खाली है क्योंकि no prefix command है।
module.exports.run = function({ api, event, client, __GLOBAL }) {};

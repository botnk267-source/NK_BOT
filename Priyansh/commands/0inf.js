module.exports.config = {
  name: "info",
  version: "1.0.1", 
  hasPermssion: 0,
  credits: "⑅⃝❥»̶̶͓͓͓̽̽̽»̶̶͓͓̽̽̽ℕ𝑲~ʌ̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋𝑬𝑫𝑰𝑻𝑶𝑹~»̶̶͓͓͓̽̽̽⑅⃝✺❀✿＊",
  description: "Admin and Bot info.",
  commandCategory: "...",
  cooldowns: 1,
  dependencies: 
  {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  const time = process.uptime(),
      hours = Math.floor(time / (60 * 60)),
      minutes = Math.floor((time % (60 * 60)) / 60),
      seconds = Math.floor(time % 60);
  const moment = require("moment-timezone");
  var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
  var link =                                     
  ["https://i.ibb.co/DDkk6qCv/IMG-20250804-WA0735.jpg"]; // DP लिंक यहाँ अपडेट किया गया है
  var callback = () => api.sendMessage({
    body:` ─╤╦︻)🌺❤️💙 𝐀𝐃𝐌𝐈𝐍 𝐀𝐍𝐃 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 🌺💜
(⌐▀͡ ̯ʖ▀)︻̷┻̿═━一-

☄️Bot Name︎︎︎☄️  ${global.config.BOTNAME}

🔥Bot Admin🔥─━━◉❖𝑵𝑲≛𝑬𝑫𝑰𝑻𝑶𝑹❖◉━━─💔🥀

🙈 𝑩𝑶𝑻 𝑨𝑫𝑴𝑰𝑵 𝑶𝑾𝑵𝑬𝑹 𝑭𝑨𝑪𝑬𝑩𝑶𝑶𝑲 𝑰𝑫 𝑳𝑰𝑵𝑲 ☞ 👇➪ https://www.facebook.com/profile.php?id=61577417285926 💞🕊️

👋𝑭𝑶𝑹 𝑨𝑵𝒀 𝑲𝑰𝑵𝑫 𝑶𝑭 𝑯𝑬𝑳𝑷 𝑪𝑶𝑵𝑻𝑨𝑪𝑻 𝑶𝑵 𝑰𝑵𝑺𝑻𝑨𝑮𝑹𝑨𝑴 👇👇☞ https://www.instagram.com/nk_lovely_143_1?igsh=OXY4eDBsbzEzMnVr==

✧══════•❁❀❁•══════✧

🌸Bot Prefix🌸☞︎︎︎.☜︎︎︎✰ ${global.config.PREFIX}

♥️Bot Owner♥️ ─━━◉❖𝑵𝑲≛𝑬𝑫𝑰𝑻𝑶𝑹❖◉━━─

🥳UPTIME🥳

🌪️Today is🌪️ ☞︎︎︎☜︎︎︎✰ ${juswa} 

⚡Bot is running⚡ ${hours}:${minutes}:${seconds}.

✅Thanks for using ${global.config.BOTNAME} @Menion. 🖤


🦢🍒•••ꞪɛᏒɛ ɪʂ ɮ❍┼ ❍ωɳɜɽ ɳaʍɜ•••🌷💞
╔═════ ▓▓ ࿇💙࿇ ▓▓ ═════╗
       💜꧁𝑁𝐾➺𝐸𝐷𝐼𝑇𝑂𝑅꧂💙
╚═════ ▓▓ ࿇❤️࿇ ▓▓ ═════╝

`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 

  return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
};

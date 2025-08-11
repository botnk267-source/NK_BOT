const axios = require('axios');
const yts = require('yt-search');

module.exports.config = {
  name: "sing",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mesbah Saxx + Nk Edit",
  description: "Download YouTube song as MP3",
  commandCategory: "media",
  usages: "sing [YouTube URL or search query]",
  cooldowns: 5,
  usePrefix: false
};

function getVideoID(url) {
  const reg = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})(?:\S+)?$/;
  const match = url.match(reg);
  return match ? match[1] : null;
}

async function getBaseApiUrl() {
  const res = await axios.get('https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json');
  return res.data.api;
}

module.exports.run = async function({ api, event, args }) {
  try {
    const baseApi = await getBaseApiUrl();

    let videoID;
    const url = args[0];
    if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) {
      videoID = getVideoID(url);
      if (!videoID) return api.sendMessage("❌ Invalid YouTube URL.", event.threadID, event.messageID);
    } else {
      const songName = args.join(' ');
      const searchingMsg = await api.sendMessage(`🔍 Searching for "${songName}"...`, event.threadID, event.messageID);
      const results = await yts(songName);
      if (!results.videos.length) return api.sendMessage("❌ No results found.", event.threadID, event.messageID);
      const randomVideo = results.videos[Math.floor(Math.random() * results.videos.length)];
      videoID = randomVideo.videoId;

      // Deleting searching message is optional depending on Mirai Bot support
      try { await api.unsendMessage(searchingMsg.messageID); } catch {}
    }

    const { data } = await axios.get(`${baseApi}/ytDl3?link=${videoID}&format=mp3`);
    const { title, quality, downloadLink } = data;

    const tinyUrlApi = 'https://tinyurl.com/api-create.php';
    const shortLink = (await axios.get(`${tinyUrlApi}?url=${encodeURIComponent(downloadLink)}`)).data;

    await api.sendMessage({
      body: `🎵 Title: ${title}\n💎 Quality: ${quality}\n\n⬇️ Download Link: ${shortLink}`,
      attachment: await axios.get(downloadLink, { responseType: 'stream' }).then(res => res.data)
    }, event.threadID, event.messageID);

  } catch (err) {
    return api.sendMessage(`❌ Error: ${err.message || "Something went wrong."}`, event.threadID, event.messageID);
  }
};

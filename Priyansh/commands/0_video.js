const axios = require("axios");
const yts = require("yt-search");

// 🔗 Base API URL fetch
const baseApiUrl = async () => {
    const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
    return base.data.api;
};

(async () => {
    global.apis = {
        diptoApi: await baseApiUrl()
    };
})();

// Local getStreamFromURL function
async function getStreamFromURL(url, pathName) {
    const response = await axios.get(url, { responseType: "stream" });
    response.data.path = pathName;
    return response.data;
}

// YouTube Video ID extract
function getVideoID(url) {
    const regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

module.exports.config = {
    name: "video",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "mesbah",
    description: "YouTube video URL ya naam se MP4 download kare",
    commandCategory: "media",
    usages: "[YouTube URL ya song ka naam]",
    cooldowns: 0
};

// Temporary storage for search results
const userSearchData = {};

module.exports.run = async function ({ api, event, args }) {
    try {
        const url = args[0];

        // Agar YouTube link diya ho → direct download
        if (url && (url.includes("youtube.com") || url.includes("youtu.be"))) {
            const videoID = getVideoID(url);
            if (!videoID) return api.sendMessage("❌ Galat YouTube URL!", event.threadID, event.messageID);
            return downloadAndSend(api, event, videoID);
        }

        // Agar naam diya ho → Top 5 results dikhana
        const query = args.join(" ");
        if (!query) return api.sendMessage("❌ Song ka naam ya YouTube link do!", event.threadID, event.messageID);

        const searchMsg = await api.sendMessage(`🔍 Searching: "${query}"`, event.threadID);
        const result = await yts(query);
        const videos = result.videos.slice(0, 5);

        api.unsendMessage(searchMsg.messageID);

        let replyMsg = "🎯 Top 5 Results:\n";
        videos.forEach((v, i) => {
            replyMsg += `${i + 1}. ${v.title} (${v.timestamp})\n`;
        });
        replyMsg += "\n📌 Reply with number (1-5) to download.";

        // Save search data for this user
        userSearchData[event.senderID] = videos;

        return api.sendMessage(replyMsg, event.threadID, (err, info) => {
            global.client.handleReply.push({
                name: module.exports.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "selection"
            });
        });

    } catch (err) {
        console.error(err);
        return api.sendMessage("⚠️ Error: " + (err.message || "Kuch galat ho gaya!"), event.threadID, event.messageID);
    }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    if (handleReply.type === "selection" && handleReply.author === event.senderID) {
        const choice = parseInt(event.body);
        if (isNaN(choice) || choice < 1 || choice > 5) {
            return api.sendMessage("❌ 1-5 ka number reply me do!", event.threadID, event.messageID);
        }

        const selectedVideo = userSearchData[event.senderID][choice - 1];
        if (!selectedVideo) return api.sendMessage("❌ Video nahi mila!", event.threadID, event.messageID);

        // Delete user search data
        delete userSearchData[event.senderID];

        api.unsendMessage(handleReply.messageID);

        return downloadAndSend(api, event, selectedVideo.videoId);
    }
};

// 🔽 Function to download and send video
async function downloadAndSend(api, event, videoID) {
    try {
        const { data: { title, quality, downloadLink } } = await axios.get(`${global.apis.diptoApi}/ytDl3?link=${videoID}&format=mp4`);
        const shortLink = (await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(downloadLink)}`)).data;

        return api.sendMessage({
            body: `🎬 Title: ${title}\n📺 Quality: ${quality}\n📥 Download: ${shortLink}`,
            attachment: await getStreamFromURL(downloadLink, `${title}.mp4`)
        }, event.threadID, event.messageID);
    } catch (err) {
        console.error(err);
        return api.sendMessage("⚠️ Error: " + (err.message || "Download fail ho gaya!"), event.threadID, event.messageID);
    }
}

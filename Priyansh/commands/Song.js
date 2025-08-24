const axios = require("axios");
const yts = require("yt-search");

// 🔗 Get Base API URL
const baseApiUrl = async () => {
    const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
    return base.data.api;
};

(async () => {
    global.apis = {
        diptoApi: await baseApiUrl()
    };
})();

// 🔧 Utils: Get Stream from URL
async function getStreamFromURL(url, pathName) {
    try {
        const response = await axios.get(url, { responseType: "stream" });
        response.data.path = pathName;
        return response.data;
    } catch (err) {
        throw new Error("Failed to get stream from URL.");
    }
}

global.utils = {
    ...global.utils,
    getStreamFromURL: global.utils.getStreamFromURL || getStreamFromURL
};

// 🔍 Extract YouTube Video ID
function getVideoID(url) {
    const regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// 📦 Command Configuration
module.exports.config = {
    name: "video2",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Mesbah Saxx (Edited by Rudra)",
    description: "Download YouTube video by URL or name",
    commandCategory: "media",
    usages: "[url | song name]",
    cooldowns: 5,
    usePrefix: true
};

// 🚀 Command Execution
module.exports.run = async function ({ api, args, event }) {
    try {
        let videoID, w;
        const url = args[0];

        // Check if input is a YouTube link
        if (url && (url.includes("youtube.com") || url.includes("youtu.be"))) {
            videoID = getVideoID(url);
            if (!videoID) {
                return api.sendMessage("❌ Invalid YouTube URL provided!", event.threadID, event.messageID);
            }
        } else {
            const query = args.join(' ');
            if (!query) return api.sendMessage("❌ Please provide a song name or YouTube link!", event.threadID, event.messageID);

            w = await api.sendMessage(`╔════════════════════╗\n\n🎬  𝑽𝒊𝒅𝒆𝒐 𝑹𝒆𝒒𝒖𝒆𝒔𝒕 𝑹𝒆𝒄𝒆𝒊𝒗𝒆𝒅  🎬\n\n╚════════════════════╝\n\n Song Name :${query}\n\n⏳ 𝑷𝒍𝒆𝒂𝒔𝒆 𝑾𝒂𝒊𝒕 𝑭𝒓𝒊𝒆𝒏𝒅...  \n\n✨ ✦🌎 𝑵𝑲➺𝑩𝑶𝑻 🌎🦋✨ ने आपकी Video Request ले ली है ✅  \n\n━━━━━━━━━━━━━━━━━━━━━━━\n\n📀 Searching Database... 🔍  \n\n🎞️ Preparing High Quality Video...  \n\n📡 Connecting To Server...  \n\n💾 Processing Request...  \n\n━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 𝑻𝒊𝒑: Stay Active,  \n\nYour video is on the way 🎥🔥  \n\n⚡ Powered By ➜ ✦🌎 𝑵𝑲➺𝑩𝑶𝑻 🌎🦋🎀  \n\n💖 Admin ➜ ❖ 𝑵𝑲≛𝑬𝑫𝑰𝑻𝑶𝑹 ❖"`, event.threadID);
            const r = await yts(query);
            const videos = r.videos.slice(0, 30);
            const selected = videos[Math.floor(Math.random() * videos.length)];
            videoID = selected.videoId;
        }

        // 🔗 Download link fetch
        const { data: { title, quality, downloadLink } } = await axios.get(`${global.apis.diptoApi}/ytDl3?link=${videoID}&format=mp4`);

        if (w?.messageID) api.unsendMessage(w.messageID);

        // 🔗 Shorten link using TinyURL
        const shortenedLink = (await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(downloadLink)}`)).data;

        // 📩 Send message with stream
        return api.sendMessage({
            body: ` ╔═════════════════╗\n\n 🎥  𝒀𝒐𝒖𝒓 𝑽𝒊𝒅𝒆𝒐 𝑰𝒔 𝑹𝒆𝒂𝒅𝒚 ✅  \n\n╚═════════════════╝\n\n✨ Great News ✨  \n\n✦🌎 𝑵𝑲➺𝑩𝑶𝑻 🌎🦋🎀 ने आपकी Video तैयार कर दी है 🔥  \n\n━━━━━━━━━━━━━━━━━━━━━━━\n\n📀 Video Found... ✔️  \n\n🎞️ High Quality Uploaded... ✔️  \n\n📡 Server Connection Stable... ✔️  \n\n💾 Processing Completed... ✔️  \n\n━━━━━━━━━━━━━━━━━━━━━━━\n\n🎬 Here is your requested video ⬇️  \n\n👉 [🎥 Download / Watch Now]\n\n⚡ Thanks For Waiting 💖  \n\n👑 Admin ➜ ❖ 𝑵𝑲≛𝑬𝑫𝑰𝑻𝑶𝑹 ❖🎬 Title: ${title}\n📺 Quality: ${quality}\n📥 Download: ${shortenedLink}`,
            attachment: await global.utils.getStreamFromURL(downloadLink, `${title}.mp4`)
        }, event.threadID, event.messageID);

    } catch (err) {
        console.error(err);
        return api.sendMessage("⚠️ Error: " + (err.message || "Something went wrong."), event.threadID, event.messageID);
    }
};

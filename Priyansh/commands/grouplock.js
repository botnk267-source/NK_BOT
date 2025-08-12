module.exports.config = {
    name: "grouplock",
    version: "1.0.0",
    role: 1,
    author: "MR SHARABI",
    description: "Lock/unlock group nickname or name",
    category: "group",
    usages: "[nick/name] [on/off] [value]",
    cooldowns: 5,
};

let nickLockData = {};
let nameLockData = {};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    if (!args[0] || !["nick", "name"].includes(args[0].toLowerCase()) || !args[1]) {
        return api.sendMessage(
            "📌 Use:\n" +
            "• grouplock nick on <nickname>\n" +
            "• grouplock nick off\n" +
            "• grouplock name on <group_name>\n" +
            "• grouplock name off",
            threadID, messageID
        );
    }

    const type = args[0].toLowerCase();
    const action = args[1].toLowerCase();

    // Nickname lock
    if (type === "nick") {
        if (action === "on") {
            const fixedNick = args.slice(2).join(" ");
            if (!fixedNick) return api.sendMessage("❌ Please provide a nickname.", threadID, messageID);

            nickLockData[threadID] = fixedNick;
            api.sendMessage(`✅ Nickname lock enabled.\n🔒 Fixed nickname: ${fixedNick}`, threadID, messageID);
        }
        if (action === "off") {
            delete nickLockData[threadID];
            api.sendMessage("🔓 Nickname lock disabled.", threadID, messageID);
        }
    }

    // Group name lock
    if (type === "name") {
        if (action === "on") {
            const fixedName = args.slice(2).join(" ");
            if (!fixedName) return api.sendMessage("❌ Please provide a group name.", threadID, messageID);

            nameLockData[threadID] = fixedName;
            api.setTitle(fixedName, threadID);
            api.sendMessage(`✅ Group name lock enabled.\n🔒 Fixed name: ${fixedName}`, threadID, messageID);
        }
        if (action === "off") {
            delete nameLockData[threadID];
            api.sendMessage("🔓 Group name lock disabled.", threadID, messageID);
        }
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, participantID } = event;

    // Nick lock check
    if (nickLockData[threadID]) {
        try {
            api.changeNickname(nickLockData[threadID], threadID, participantID);
        } catch (err) {
            console.error(err);
        }
    }

    // Name lock check
    if (nameLockData[threadID]) {
        try {
            api.setTitle(nameLockData[threadID], threadID);
        } catch (err) {
            console.error(err);
        }
    }
};

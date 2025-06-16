const {
       plugin,
       mode
} = require('../lib');

/*
plugin({
    pattern: 'ping ?(.*)',
    desc: 'check bot speed',
    react: "💯",
    fromMe: mode,
    type: 'info'
}, async (message, match) => {
    const start = new Date().getTime()
    const msg = await message.send('Ping!')
    const end = new Date().getTime()
    return await msg.edit('*⚡PONG!* ' + (end - start) + ' ms');
});
*/

plugin({
    pattern: 'ping ?(.*)',
    desc: 'Stylish Ping with FX',
    react: '🚀',
    fromMe: mode,
    type: 'info'
}, async (message, match) => {
    const start = new Date().getTime();

    // Step 1 - Starting animation
    let msg = await message.send("🚀 Initializing Ping Sequence...");
    await new Promise(resolve => setTimeout(resolve, 600));

    // Step 2 - Scanning memory
    await msg.edit("🧠 Scanning system memory...");
    await new Promise(resolve => setTimeout(resolve, 600));

    // Step 3 - Stabilizing energy
    await msg.edit("⚡ Stabilizing energy flow...");
    await new Promise(resolve => setTimeout(resolve, 600));

    const end = new Date().getTime();
    const speed = end - start;

    // Final Stylish Response
    await msg.edit(
        `\`\`\`\n` +
        `💠 SYSTEM RESPONSE 💠\n` +
        `-------------------------\n` +
        `⚡ PONG: ${speed} ms\n` +
        `📡 BOT STATUS: ONLINE ✅\n` +
        `👑 OWNER: LovelyBoy-X1\n` +
        `-------------------------\n` +
        `\`\`\`\n` +
        `_Powered by ⚡ LovlyBoy AI_`
    );
});
const {
	inrl,
	mode,
	config,
	getBuffer,
	getJson
} = require('../lib');



inrl({
    pattern: 'gpt ?(.*)',
    desc: 'get open ai chatgpt response',
    type: "eva",
    fromMe: mode
}, async (message, match) => {
    if(match && match == 'clear') {
        await GPT.clear();
        return await message.send('_successfully cleard_');
    }
    match = match || message.reply_message.text;
        if (!match) return await message.reply('_please can you provide me a task_');
        if(!config.OPEN_AI) {
            const res = await getJson(`${config.BASE_URL}api/ai/chatgpt?text=${match}&apikey=${config.INRL_KEY}`);
            if (!res.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar inrl_key: your apikey`);
            return await message.send(res.result);
        } 
        return await message.send(await GPT.prompt(match));
});

inrl({
	pattern: 'diffusion ?(.*)',
	type: "eva",
	desc: "stable diffusion ai",
	fromMe: mode
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an query!*");
	const res = await getBuffer(`${config.BASE_URL}api/ai/diffusion?text=${match}&apikey=${config.INRL_KEY}`);
	return await message.send(res, {},'image');
});

inrl({
	pattern: 'gemini ?(.*)',
	type: "eva",
	fromMe: mode,
	desc: "gemini ai",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an query!*");
	const res = await getJson(`${config.BASE_URL}api/ai/gemini?text=${match}&apikey=${config.INRL_KEY}`);
	if (!res.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar inrl_key: your apikey`);
	return await message.send(res.result);
});

inrl({
	pattern: 'bard ?(.*)',
	type: "eva",
	fromMe: mode,
	desc: "bard ai",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an query!*");
	const res = await getJson(`${config.BASE_URL}api/ai/bard?text=${match}&apikey=${config.INRL_KEY}`);
	if (!res.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar inrl_key: your apikey`);
	return await message.send(res.result);
});

inrl({
	pattern: 'bing ?(.*)',
	type: "eva",
	fromMe: mode,
	desc: "bing ai",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an query!*");
	const res = await getBuffer(`${config.BASE_URL}api/ai/bing?text=${match}&apikey=${config.INRL_KEY}`);
	return await message.send(res, {},'image');
});

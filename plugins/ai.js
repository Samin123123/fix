const {
	inrl,
	mode,
	config,
	getBuffer,
	getJson
} = require('../lib');


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

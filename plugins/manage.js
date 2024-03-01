const {
    inrl,
    groupDB
} = require('../lib');
const actions = ['kick','warn','null']



inrl({
    pattern: 'antifake ?(.*)',
    desc: 'remove fake numbers',
    fromMe: true,
    react: '🖕',
    type: 'manage',
    onlyGroup: true
}, async (message, match) => {
    if (!match) return await message.reply('_*antifake* 94,92_\n_*antifake* on/off_\n_*antifake* list_');
    const {antifake} = await groupDB(['antifake'], {jid: message.jid, content: {}}, 'get');
    if(match.toLowerCase()=='get'){
    if(!antifake || antifake.status == 'false' || !antifake.data) return await message.send('_Not Found_');
    return await message.send(`_*activated restricted numbers*: ${antifake.data}_`);
    } else if(match.toLowerCase() == 'on') {
    	const data = antifake && antifake.data ? antifake.data : '';
    	await groupDB(['antifake'], {jid: message.jid, content: {status: 'true', data}}, 'set');
        return await message.send(`_Antifake Activated_`)
    } else if(match.toLowerCase() == 'off') {
        const data = antifake && antifake.data ? antifake.data : '';
    	await groupDB(['antifake'], {jid: message.jid, content: {status: 'false', data}}, 'set');
    return await message.send(`_Antifake Deactivated_`)
    }
    match = match.replace(/[^0-9,!]/g, '');
    if(!match) return await message.send('value must be number');
    const status = antifake && antifake.status ? antifake.status : 'false';
    await groupDB(['antifake'], {jid: message.jid, content: {status, data: match}}, 'set');
    return await message.send(`_Antifake Updated_`);
});

inrl({
    pattern: 'antidelete ?(.*)',
    desc: 'forward deleted messages',
    type: 'manage',
    onlyGroup: true,
    fromMe: true
}, async (message, match) => {
    if (!match) return message.reply('antidelete on/off');
    if (match != 'on' && match != 'off') return message.reply('antidelete on');
    const {antidelete} = await groupDB(['antidelete'], {jid: message.jid, content: {}}, 'get');
    if (match == 'on') {
        if (antidelete == 'true') return message.reply('_Already activated_');
        await groupDB(['antidelete'], {jid: message.jid, content: 'true'}, 'set');
        return await message.reply('_activated_')
    } else if (match == 'off') {
        if (antidelete == 'false') return message.reply('_Already Deactivated_');
        await groupDB(['antidelete'], {jid: message.jid, content: 'false'}, 'set');
        return await message.reply('_deactivated_')
    }
});

inrl({
    pattern: 'antibot ?(.*)',
    desc: 'remove users who use bot',
    type: "manage",
    onlyGroup: true,
    fromMe: true 
}, async (message, match) => {
    if (!match) return await message.reply("_*antibot* on/off_\n_*antibot* action warn/kick/null_");
    const {antibot} = await groupDB(['antibot'], {jid: message.jid, content: {}}, 'get');
    if(match.toLowerCase() == 'on') {
    	const action = antibot && antibot.action ? antibot.action : 'null';
        await groupDB(['antibot'], {jid: message.jid, content: {status: 'true', action }}, 'set');
        return await message.send(`_antibot Activated with action null_\n_*antibot action* warn/kick/null for chaning actions_`)
    } else if(match.toLowerCase() == 'off') {
    	const action = antibot && antibot.action ? antibot.action : 'null';
        await groupDB(['antibot'], {jid: message.jid, content: {status: 'false', action }}, 'set')
        return await message.send(`_antibot deactivated_`)
    } else if(match.toLowerCase().match('action')) {
    	const status = antibot && antibot.status ? antibot.status : 'false';
        match = match.replace(/action/gi,'').trim();
        if(!actions.includes(match)) return await message.send('_action must be warn,kick or null_')
        await groupDB(['antibot'], {jid: message.jid, content: {status, action: match }}, 'set')
        return await message.send(`_AntiBot Action Updated_`);
    }
});

inrl({
    pattern: 'antidemote ?(.*)',
    desc: 'demote actor and re-promote demoted person',
    type: 'manage',
    onlyGroup: true,
    fromMe: true
}, async (message, match) => {
    if (!match) return message.reply('antidemote on/off');
    if (match != 'on' && match != 'off') return message.reply('antidemote on');
    const {antidemote} = await groupDB(['antidemote'], {jid: message.jid, content: {}}, 'get');
    if (match == 'on') {
        if (antidemote == 'true') return message.reply('_Already activated_');
        await groupDB(['antidemote'], {jid: message.jid, content: 'true'}, 'set');
        return await message.reply('_activated_')
    } else if (match == 'off') {
        if (antidemote == 'false') return message.reply('_Already Deactivated_');
        await groupDB(['antidemote'], {jid: message.jid, content: 'false'}, 'set');
        return await message.reply('_deactivated_')
    }
});

inrl({
    pattern: 'antipromote ?(.*)',
    desc: 'demote actor and re-promote demoted person',
    type: 'manage',
    onlyGroup: true,
    fromMe: true
}, async (message, match) => {
    if (!match) return message.reply('antipromote on/off');
    if (match != 'on' && match != 'off') return message.reply('antipromote on');
    const {antipromote} = await groupDB(['antipromote'], {jid: message.jid, content: {}}, 'get');
    if (match == 'on') {
        if (antipromote == 'true') return message.reply('_Already activated_');
        await groupDB(['antipromote'], {jid: message.jid, content: 'true'}, 'set');
        return await message.reply('_activated_')
    } else if (match == 'off') {
        if (antipromote == 'false') return message.reply('_Already Deactivated_');
        await groupDB(['antipromote'], {jid: message.jid, content: 'false'}, 'set');
        return await message.reply('_deactivated_')
    }
});

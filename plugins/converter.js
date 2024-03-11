const {
    inrl,
    mode,
    toAudio,
    toPTT,
    toVideo,
    AudioMetaData,
    lang,
    config,
    webp2mp4File
} = require('../lib');

const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

inrl({
    pattern: 'photo ?(.*)',
    desc: lang.CONVERTER.PHOTO_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.sticker) return  await message.reply(lang.BASE.NEED.format("non animated sticker message"));
    if(message.reply_message.isAnimatedSticker) return  await message.reply(lang.BASE.NEED.format("please reply to a non animated sticker"));
    const media = await message.client.downloadAndSaveMediaMessage(message.reply_message.sticker)
        await ffmpeg(media)
            .fromFormat('webp_pipe')
            .save('output.png')
            .on('error', function(err) {
                return await message.send(`*error while converting webp to image*`);
            })
            .on('end', async () => {
                return await message.send(fs.readFileSync('output.png'), {},'image');
            });
});
inrl({
    pattern: 'voice ?(.*)',
    desc: lang.CONVERTER.AUDIO_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("video/audio message"));
    let media = await toPTT(await message.reply_message.download())
    return await message.send(media,{
        mimetype: 'audio/mpeg',
        ptt: true
    }, 'audio')
});
inrl({
    pattern: 'gif ?(.*)',
    desc: lang.CONVERTER.GIF_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.sticker || message.reply_message.video) return message.reply(lang.BASE.NEED.format("animated sticker/video message"));
    await webp2mp4File(await message.client.downloadAndSaveMediaMessage(message.reply_message.sticker || message.reply_message.video))
    return await message.send({ url : webpToMp4.result }, {gifPlayback: true, quoted: message.data }, 'video'); 
});
inrl({
    pattern: 'bass ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-af equalizer=f=54:width_type=o:width=2:g=20"])
        .save("./media/bass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/bass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
        });
});
inrl({
    pattern: 'slow ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .audioFilter("atempo=0.5")
        .outputOptions(["-y", "-af", "asetrate=44100*0.9"])
        .save("./media/slow.mp3")
        .on('error', function(err) {
                return await message.send(`*error while degreasing audio speed*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/slow.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
      });
});
inrl({
    pattern: 'blown ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-af acrusher=.1:1:64:0:log"])
        .save("./media/blown.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating blown audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/blown.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
        });
});
inrl({
    pattern: 'deep ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-af atempo=4/4,asetrate=44500*2/3"])
        .save("./media/bass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/bass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
      });      
});
inrl({
    pattern: 'earrape ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-af volume=12"])
        .save("./media/bass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/bass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
        });	
});
inrl({
    pattern: 'fast ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-filter:a atempo=1.63,asetrate=44100"])
        .save("./media/bhass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/bhass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
     });
});
inrl({
    pattern: 'fat ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-filter:a atempo=1.6,asetrate=22100"])
        .save("./media/bgass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/bgass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
        });
});
inrl({
    pattern: 'nightcore ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-filter:a atempo=1.06,asetrate=44100*1.25"])
        .save("./media/bgass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/bgass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
        });  
});
inrl({
    pattern: 'reverse ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-filter_complex areverse"])
        .save("./media/bgass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/bgass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
        });  
});
inrl({
    pattern: 'squirrel ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    await ffmpeg(await message.client.downloadAndSaveMediaMessage(message.reply_message.audio))
        .outputOptions(["-filter:a atempo=0.5,asetrate=65100"])
        .save("./media/beass.mp3")
        .on('error', function(err) {
                return await message.send(`*error while generating bass audio*`);
         })
        .on('end', async () => {
            await message.client.sendMessage(message.from, {
                audio: fs.readFileSync('./media/beass.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            })
        });
});

inrl({
    pattern: 'mp3 ?(.*)',
    desc: lang.CONVERTER.MP3_DESC,
    type: "converter",
    fromMe: mode
}, (async (message) => {
    if (!message.reply_message.audio && !message.reply_message.video) return message.reply(lang.BASE.NEED.format("video message"));
    const opt = {
                title: config.AUDIO_DATA.split(/[|,;]/)[0] || config.AUDIO_DATA,
                body: config.AUDIO_DATA.split(/[|,;]/)[1],
                image: config.AUDIO_DATA.split(/[|,;]/)[2]
            }
    const AudioMeta = await AudioMetaData(await toAudio(await message.reply_message.download()), opt);
    return await message.send(AudioMeta,{
        mimetype: 'audio/mpeg'
    },'audio')
}));

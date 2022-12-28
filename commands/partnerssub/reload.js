/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../../index');

module.exports = async function(interaction) {
    let guildObjects = await guilds.find()
    let guildArray = await guildObjects.toArray();
    guildArray.forEach(async guild => {
        let channel = await client.channels.fetch(guild.channel);
        await channel.messages.fetch({ limit: 100, after: "0" }).then((messagePage) => { messagePage.forEach(async (msg) => await msg.delete()); });
        await channel.send('Testing the power of Yusuf\'s tyrannical regime');
        await channel.send('Regime is stable');
        await channel.send('Long live the great dictator Yusuf Rahman, may his tyranny forever reign supreme over the VLC');
    });
}
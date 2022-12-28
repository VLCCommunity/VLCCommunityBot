/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../index');

module.exports = async function(interaction) {
    let guild = await guilds.findOne({ _id: interaction.customId.split('-')[1] });
    let channel = await client.channels.fetch(guild.channel);
    let invite = await channel.createInvite({
        maxUses: 1,
        unique: true,
        reason: `Requested by ${interaction.user.tag}`        
    });
    interaction.reply({
        content: invite.url,
        ephemeral: true
    });
}
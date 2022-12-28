/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../index');

module.exports = async function(interaction) {
    if (await  globals.perms(interaction.user) > 2) return globals.respond(interaction, false, ':x: Insufficient Permissions', 'You must be an Adminstrator or Hall Monitor to use this command.')

    let pings = `${interaction.options.getUser('member')} `;
    if (interaction.options.getUser('member2')) { pings = pings + `${interaction.options.getUser('member2')} `}
    if (interaction.options.getUser('member3')) { pings = pings + `${interaction.options.getUser('member3')} `}

    let newConversation = await interaction.options.getChannel('channel').send( pings + 'Please move here.');
    interaction.channel.send({ content: `${pings}Please move to ${interaction.options.getChannel('channel')}! :smile:`, components: [{ type: 1, components: [{ type: 2, style: 'LINK', label: 'Move', url: newConversation.url }]}]});

    await interaction.channel.permissionOverwrites.create(interaction.options.getUser('member'), { 'SEND_MESSAGES': false });

    setTimeout(async () => {
        await interaction.channel.permissionOverwrites.delete(interaction.options.getUser('member'));
    }, 30000);

    if (interaction.options.getUser('member2')) {
        await interaction.channel.permissionOverwrites.create(interaction.options.getUser('member2'), { 'SEND_MESSAGES': false });

        setTimeout(async () => {
            await interaction.channel.permissionOverwrites.delete(interaction.options.getUser('member2'));
        }, 30000);
    }

    if (interaction.options.getUser('member3')) {
        await interaction.channel.permissionOverwrites.create(interaction.options.getUser('member3'), { 'SEND_MESSAGES': false });

        setTimeout(async () => {
            await interaction.channel.permissionOverwrites.delete(interaction.options.getUser('member3'));
        }, 30000);
    }

    globals.respond(interaction, true, 'Conversation forced.');
    globals.log(interaction.user, '/force', `${pings} forced to ${interaction.options.getChannel('channel')}.`);
}
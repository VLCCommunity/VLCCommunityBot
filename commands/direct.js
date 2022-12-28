/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../index');

module.exports = async function(interaction) {
    let pings = `${interaction.options.getUser('member')} `;
    if (interaction.options.getUser('member2')) { pings = pings + `${interaction.options.getUser('member2')} `}
    if (interaction.options.getUser('member3')) { pings = pings + `${interaction.options.getUser('member3')} `}

    let newConversation = await interaction.options.getChannel('channel').send( pings + '*Pssst...* 😊');
    interaction.channel.send({ content: `${pings}You should move to ${interaction.options.getChannel('channel')}! :smile:`, components: [{ type: 1, components: [{ type: 2, style: 'LINK', label: 'Move', url: newConversation.url }]}]});

    globals.respond(interaction, true, '/direct');
    globals.log(interaction.user, '/direct', `${pings} directed to ${interaction.options.getChannel('channel')}.`);
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../index');

module.exports = async function(interaction) {
    if (await  globals.perms(interaction.user) > 0) return globals.respond(interaction, false, '❌ Insufficient Permissions', 'Only the Executive Adminstrator of VLC Community & Partners can execute this command.');

    let user = await client.users.fetch(interaction.options.getString('id'));
    client.guilds.cache.each(guild => {
        try {
            guild.members.ban(user, {
                deleteMessageSeconds: 604800,
                reason: 'Cancelled'
            });
        } catch {
            //
        }
    })

    globals.respond(interaction, true, 'User cancelled.')
    globals.log(interaction.user, '/cancel', `<@${interaction.options.getString('id')}> (ID: \`${interaction.options.getString('id')}\`) has been cancelled.`)
}
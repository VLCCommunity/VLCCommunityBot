/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../index');

module.exports = async function(interaction) {
    if (await  globals.perms(interaction.user) > 2) return globals.respond(interaction, false, ':x: Insufficient Permissions', 'You must be an Adminstrator or Hall Monitor to use this command.')
}
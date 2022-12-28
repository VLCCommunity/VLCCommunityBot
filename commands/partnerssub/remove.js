/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../../index');

module.exports = async function(interaction) {
    try {
        await guilds.deleteOne({ _id: interaction.options.getString('id') });
        globals.respond(interaction, true, ':white_check_mark: Partnership removed.', 'Do `/partners reload` to update partnership page.');
        globals.log(interaction.user, 'Partnership removed.', `A server (ID: \`${interaction.options.getString('id')}\`) is no longer partnered.`)
    } catch (error) {
        globals.respond(interaction, false, ':x: Partnership removal failed.', `\`\`\`\n${error}\n\`\`\``);
    }
}
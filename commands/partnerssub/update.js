/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../../index');

module.exports = async function(interaction) {
    try {
        await guilds.updateOne(
            { _id: interaction.guild.id },
            {
                $set: {
                    name: interaction.guild.name,
                    type: interaction.options.getString('type'),
                    channel: interaction.options.getChannel('channel').id
                }
            }
        );
        globals.respond(interaction, true, ':white_check_mark: Partnership updated.', 'Do `/partners reload` to update partnership page.');
    } catch (error) {
        globals.respond(interaction, false, ':x: Partnership update failed.', `\`\`\`\n${error}\n\`\`\``);
    }
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../../index');

module.exports = async function(interaction) {
    /*let allRoles = await interaction.guild.roles.fetch();
    let roles = await allRoles.filter(role => {
        role.name.startsWith('🎓 Grade') || role.name.startsWith('Retired')
    });

    console.log(roles.toJSON())
    
    Basically it's supposed to fetch all the roles that start with '🎓 Grade' or '🎓 Class of', check that all members have at least one of those roles, and then spit out a list (of pings) of members who don't have at least one of those roles.*/

    globals.respond(interaction, true, 'Tell Ibrahim to make this.');
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../../index');
const { MessageAttachment, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const header = new MessageAttachment('./commands/partnerssub/partners.png')
const mainPartners = new MessageEmbed()
    .setColor('#2196F3')
    .addFields(
        { 'name': 'VLC Community', 'value': 'Central Discord server for all VLC students'},
        { 'name': 'VLC Archive', 'value': 'Database of notes and supplementary material for all VLC courses' },
        { 'name': 'VLC Museum', 'value': 'Coming soon' },
        { 'name': 'The Voice', 'value': 'VLC\'s leading news media publication' }
    )


module.exports = async function(interaction) {
    let community = await guilds.findOne({ type: 'community'});
    let grade9 = await guilds.findOne({ type: 'grade 9' });
    let grade10 = await guilds.findOne({ type: 'grade 10' });
    let grade11 = await guilds.findOne({ type: 'grade 11' });
    let grade12 = await guilds.findOne({ type: 'grade 12' });
    let clubs = await guilds.find({ type: 'club' }).toArray();
    let channels = await guilds.find().map( function(g) { return g.channel; } ).toArray();
    //console.log(clubs);
    //console.log(community._id)

    const mainPartnersButtons = new MessageActionRow()
        .addComponents(
            new MessageButton().setStyle('PRIMARY').setCustomId(`invite-${community._id}`).setLabel('VLC Community'),
            new MessageButton().setStyle('LINK').setLabel('VLC Archive').setURL('https://vlccommunity.notion.site/b73d20c433be47b0859fd792250dd8ca?v=88377dd7b209401090223851b6dcc037')
        );

    channels.forEach(async channelID => {
        let channel = await client.channels.fetch(channelID);
        await channel.messages.fetch({ limit: 100, after: "0" }).then((messagePage) => { messagePage.forEach(async (msg) => await msg.delete()); });
        await channel.send({ files: [header] } );
        await channel.send({ embeds: [mainPartners] } );
        await channel.send({ components: [mainPartnersButtons] } );
        await channel.send('Testing the power of Yusuf\'s tyrannical regime');
        await channel.send('Regime is stable');
        await channel.send('Long live the great dictator Yusuf Rahman, may his tyranny forever reign supreme over the VLC');
        await channel.send('God bless the dictator and the dictatorship he dictates with his dictionairy-like dictation');
    });
}
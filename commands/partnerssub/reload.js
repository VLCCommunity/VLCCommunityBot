/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('../../index');
const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const header = new AttachmentBuilder('./commands/partnerssub/partners.png')
const mainPartners = new EmbedBuilder()
    .setColor('#2196F3')
    .addFields(
        { 'name': 'VLC Community', 'value': 'Central Discord server for all VLC students.'},
        { 'name': 'VLC Classic', 'value': 'Old Central Discord server.' },
        { 'name': 'VLC Archive', 'value': 'Database of notes and supplementary material for all VLC courses.' },
        // { 'name': 'VLC Museum', 'value': 'Coming soon.' },
        { 'name': 'The Voice', 'value': 'VLC\'s leading news media publication.' }
    )
const gradeservers = new EmbedBuilder()
    .setColor('#2196F3')
    .setTitle('Grade Servers')
    .setDescription('Discord servers for each grade - **please do not join a server if you are not taking a course in that grade.**')

const clubservers = new EmbedBuilder()
    .setColor('#2196F3')
    .setTitle('Club Servers')
    .setDescription('Discord servers for various school clubs.')

const footer = new EmbedBuilder()
    .setColor('#2196F3')
    .setDescription('*VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. The VLC name, logo, and all other branding are property of the Virtual Learning Center.*\n\n*Proudly under the eternal tyranny of the great dictator Yusuf Rahman.* <:yusufr:942827654397198396>')


module.exports = async function(interaction) {
    globals.respond(interaction, true, 'Reloading partnerships page...');

    let community = await guilds.findOne({ type: 'community'});
    let communityOld = await guilds.findOne({ type: 'community-old'});
    let grade9 = await guilds.findOne({ type: 'grade9' });
    //let grade10 = await guilds.findOne({ type: 'grade10' });
    let grade11 = await guilds.findOne({ type: 'grade11' });
    let grade12 = await guilds.findOne({ type: 'grade12' });
    let clubs = await guilds.find({ type: 'club' }).toArray();
    let channels = await guilds.find().map( function(g) { return g.channel; } ).toArray();
    //console.log(clubs);
    //console.log(community._id)

    const mainPartnersButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`invite-${community._id}`).setLabel('VLC Community'),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('VLC Classic').setURL(communityOld.invite),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('VLC Archive').setURL('https://vlccommunity.notion.site/b73d20c433be47b0859fd792250dd8ca?v=88377dd7b209401090223851b6dcc037'),
            // new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('VLC Museum').setURL('https://vlccommunity.notion.site/VLC-Museum-7acf51d0302040eb9d923a37762bf6a0'),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('The Voice').setURL('https://vlcvoice.tumblr.com/')
        );

    const gradeserversButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`invite-${grade9._id}`).setLabel('Grade 9'),
            //new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`invite-${grade10._id}`).setLabel('Grade 10'),  // ;(
            new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`invite-${grade11._id}`).setLabel('Grade 11'),
            new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`invite-${grade12._id}`).setLabel('Grade 12'),
        );

    const clubserversButtons = new ActionRowBuilder()
        .addComponents(
            clubs.map(c => new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`invite-${c._id}`).setLabel(c.name)
        ));

    await channels.forEach(async channelID => {
        if (!channelID) return;

        let channel = await client.channels.fetch(channelID);
        await channel.messages.fetch({ limit: 100, after: "0" }).then((messagePage) => { messagePage.forEach(async (msg) => await msg.delete()); });
        await channel.send({ files: [header] } );
        await channel.send({ embeds: [mainPartners], components: [mainPartnersButtons] } );
        await channel.send({ embeds: [gradeservers], components: [gradeserversButtons] } );
        await channel.send({ embeds: [clubservers], components: [clubserversButtons] } );
        await channel.send({ embeds: [footer] } );
    });

    globals.respondAgain(interaction, true, ':white_check_mark: Partnerships page reloaded.');
    globals.log(interaction.user, '/partners reload')
}

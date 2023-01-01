/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require('./index');

module.exports = async function(message) {
    if (message.author.bot) return;
    // Yusuf'd Retirement Notice
    if (message.content.includes('<@218065068875579393>')) {
        return;
        message.reply({ embeds: [{
            description: '**Please be informed that the Eternal Tyrant of the VLC, Yusuf Rahman, is retired and will not respond to pings.**\n\nFor matters relating to VLC Community, please contact an administrator.\n\nFor matters relating to the VLC Archive, please contact Yasmeen Rabbani and Sarah Sameer Hasan.\n\nFor matters relating to the VLC Museum, please contact Shifa Syed.\n\nFor matters relating to the VLC Museum, please email `editor@vlcvoice.com` or DM `@vlc.thevoice` on Instagram.\n\nFor matters relating to VLC OneKey, please contact Ibrahim Siddique or Ahsen Khan.\n\nOnly DM Mr. Rahman for emergencies.',
            footer: {
                iconURL: client.user.displayAvatarURL(),
                text: 'VLC Community',
              },
              color: 2201331,
        }] });
    }
    // Embed Creator
    if (await globals.perms(message.author) == 0 && message.content.startsWith('!embedify ')) {
        message.channel.send({ embeds: [{
            description: message.content.slice(10),
            color: 2201331
        }]});
        message.delete();
    }

    // Logger
    if (message.content.toLowerCase().includes('yusuf') || message.content.includes('<@218065068875579393>') || message.content.includes('dictator') || message.content.includes('tyrant') ) {
        let channel = await client.channels.fetch('1057610844193685514');
        channel.send({ embeds: [{
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL(),
            }, description: message.content,
            footer: {
                iconURL: message.guild.iconURL(),
                text: message.guild.name,
            }, color: 2201331,
            timestamp: message.createdTimestamp
        }], components: [{ type: 1, components: [{ type: 2, style: 'LINK', label: 'Jump', url: message.url }]}] });
    }
}
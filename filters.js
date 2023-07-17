/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC.
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, globals } = require("./index");
const { ButtonStyle } = require("discord.js");

module.exports = async function (message) {
    if (message.author.bot) return;

    // Introductions Channel
    if (message.channel.id == "829792673451868263" && message.type == "REPLY") {
        let messageReply = await message.reply({
            embeds: [
                {
                    description:
                        "This channel is for new members to introduce themselves. Please respond to introductions by creating threads.",
                    footer: {
                        iconURL: client.user.displayAvatarURL(),
                        text: "VLC Community",
                    },
                    color: 2201331,
                },
            ],
        });
        setTimeout(async () => {
            try {
                await message.delete();
            } catch {}
        }, 10000);
        setTimeout(async () => {
            try {
                await messageReply.delete();
            } catch {}
        }, 10000);
    }

    // Not Instagram Channel
    if (message.channel.id == "1063254087266742272") {
        if (
            message.attachments.size == 0 &&
            message.embeds.length == 0 &&
            !message.content.startsWith("> ") &&
            !message.content.includes("http")
        ) {
            let messageReply = await message.reply({
                embeds: [
                    {
                        description:
                            "This channel is for members to post content such as media, links, and quotes here and share what they're up to. Your message does not seem to meet those guidelines.",
                        footer: {
                            iconURL: client.user.displayAvatarURL(),
                            text: "VLC Community",
                        },
                        color: 2201331,
                    },
                ],
            });
            setTimeout(async () => {
                try {
                    await message.delete();
                } catch {}
            }, 10000);
            setTimeout(async () => {
                try {
                    await messageReply.delete();
                } catch {}
            }, 10000);
        } else if (message.type == "REPLY") {
            let messageReply = await message.reply({
                embeds: [
                    {
                        description: "Create a thread to comment on posts.",
                        footer: {
                            iconURL: client.user.displayAvatarURL(),
                            text: "VLC Community",
                        },
                        color: 2201331,
                    },
                ],
            });
            setTimeout(async () => {
                try {
                    await message.delete();
                } catch {}
            }, 10000);
            setTimeout(async () => {
                try {
                    await messageReply.delete();
                } catch {}
            }, 10000);
        }
    }

    //

    // Yusuf's Retirement Notice
    if (message.content.includes("<@218065068875579393>")) {
        await message.reply({
            embeds: [
                {
                    description:
                        "**Please be informed that the Eternal Tyrant of the VLC, Yusuf Rahman, is retired and will not respond to pings.**\n\nFor matters relating to VLC Community, please contact Sarah Sameer Hasan or another administrator.\n\nFor matters relating to the VLC Archive, please contact Yasmeen Rabbani and Sarah Sameer Hasan.\n\nFor matters relating to the VLC Museum, please contact Shifa Syed.\n\nFor matters relating to the Voice, please email `editor@vlcvoice.com` or DM `@vlc.thevoice` on Instagram.\n\nFor matters relating to VLC OneKey, please contact Ibrahim Siddique or Ahsen Khan.\n\nOnly DM Mr. Rahman for emergencies.",
                    footer: {
                        iconURL: client.user.displayAvatarURL(),
                        text: "VLC Community",
                    },
                    color: 2201331,
                },
            ],
        });
    }
    // Embed Creator
    if (
        message.author &&
        (await globals.perms(message.author)) == 0 &&
        message.content.startsWith("!embedify ")
    ) {
        await message.channel.send({
            embeds: [
                {
                    description: message.content.slice(10),
                    color: 2201331,
                },
            ],
        });
        message.delete();
    }

    // Convert message content to lowercase
    let lowerCaseMessage = message.content.toLowerCase();

    // Message conditions
    let conditions = ["yusuf", "<@218065068875579393>", "dictator", "tyrant", "mustafa", "ahsen", "ibrahim", "karma", "mahr", "mahar"]

    // Whether to log the message
    const logMessage = conditions.some(condition => lowerCaseMessage.includes(condition));

    // Logger
    if (logMessage) {
        let channel = await client.channels.fetch("1057610844193685514");
        await channel.send({
            embeds: [
                {
                    author: {
                        name: message.author.tag.replace("#0", ""),
                        icon_url: message.author.displayAvatarURL(),
                    },
                    description: message.content,
                    footer: {
                        iconURL: message.guild.iconURL(),
                        text: message.guild.name,
                    },
                    color: 2201331,
                    timestamp: new Date(message.createdTimestamp).toISOString(),
                },
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: ButtonStyle.Link,
                            label: "Jump",
                            url: message.url,
                        },
                    ],
                },
            ],
        });
    }
};

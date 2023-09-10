/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC.
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require("../index");

module.exports = async function (interaction) {
  let channel = interaction.options.getChannel("channel");
  let newConversation = await channel.send({
    embeds: [
      {
        description: `Conversation moved from <#${interaction.channel.id}>.`,
        author: {
          name: interaction.user.tag,
          icon_url: interaction.user.displayAvatarURL(),
        },
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: "VLC Community",
        },
        color: 2201331,
      },
    ],
  });

  let oldConversation = await interaction.reply({
    embeds: [
      {
        description: `Conversation moved to <#${
          interaction.options.getChannel("channel").id
        }>.`,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: "VLC Community",
        },
        color: 2201331,
      },
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: "LINK",
            label: "Move",
            url: newConversation.url,
          },
        ],
      },
    ],
  });
};

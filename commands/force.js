/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC.
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { globals } = require("../index");
const { ButtonStyle } = require("discord.js");

module.exports = async function (interaction) {
  if ((await globals.perms(interaction.user)) > 2)
    return globals.respond(
      interaction,
      false,
      ":x: Insufficient Permissions",
      "You must be an Adminstrator or Hall Monitor to use this command.",
    );

  // Initialize empty members array
  let members = [interaction.options.getUser("member")];

  // Extra members
  if (interaction.options.getUser("member2")) {
    members.push(interaction.options.getUser("member2"));
  }
  if (interaction.options.getUser("member3")) {
    members.push(interaction.options.getUser("member3"));
  }

  // Join members with a space
  let pings = members.join(" ");

  // Send message to new channel
  let newConversation = await interaction.options
    .getChannel("channel")
    .send(pings + " Please move here.");

  // Send message to old channel with link to new channel
  interaction.channel.send({
    content: `${pings} Please move to ${interaction.options.getChannel(
      "channel",
    )}! :smile:`,
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: ButtonStyle.Link,
            label: "Move",
            url: newConversation.url,
          },
        ],
      },
    ],
  });

  // Iterate over members array
  for (let member of members) {
    // Add custom SendMessages permission
    await interaction.channel.permissionOverwrites.create(member, {
      SendMessages: false,
    });

    // Add back default permissions after 30 seconds
    setTimeout(async () => {
      await interaction.channel.permissionOverwrites.delete(member);
    }, 30000);
  }

  globals.respond(interaction, true, "Conversation forced.");
  globals.log(
    interaction.user,
    "/force",
    `${pings} forced to ${interaction.options.getChannel("channel")}.`,
  );
};

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC.
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds } = require("./index");

const logsChannelID = "1057066261164593292";

const perms = async function (user) {
  let comm = await client.guilds.fetch("829792672935575623");
  let commMember;

  try {
    commMember = await comm.members.fetch(user.id);
  } catch {
    return 3;
  }

  if (!commMember) return 3;
  if (
    user.id == "1168661912289030296" ||
    commMember.roles.cache.has("860576761287934013")
  )
    return 0;
  else if (commMember.roles.cache.has("829792673090502764")) return 1;
  else if (commMember.roles.cache.has("829792673090502763")) return 2;
  else return 3;
};

const respond = async function (interaction, success, title, description = "") {
  let color = 15548997;
  if (success) {
    color = 5763719;
  }

  await interaction.reply({
    embeds: [
      {
        title: title,
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: "VLC Community",
        },
        color: color,
      },
    ],
    ephemeral: true,
  });
};

const respondAgain = async function (
  interaction,
  success,
  title,
  description = "",
) {
  let color = 15548997;
  if (success) {
    color = 5763719;
  }

  await interaction.followUp({
    embeds: [
      {
        title: title,
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: "VLC Community",
        },
        color: color,
      },
    ],
    ephemeral: true,
  });
};

const log = async function (user, title, description = "") {
  const logsChannel = await client.channels.fetch(logsChannelID);
  logsChannel.send({
    embeds: [
      {
        title: title,
        description: description,
        author: {
          name: user.tag,
          icon_url: user.displayAvatarURL(),
        },
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: "VLC Community",
        },
        color: 2201331,
      },
    ],
  });
};

const warn = async function (description) {
  const logsChannel = await client.channels.fetch(logsChannelID);
  logsChannel.send({
    embeds: [
      {
        title: "⚠ Warning",
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: "VLC Community",
        },
        color: 16705372,
      },
    ],
  });
};

const error = async function (description) {
  const logsChannel = await client.channels.fetch(logsChannelID);
  logsChannel.send({
    embeds: [
      {
        title: "❌ Error",
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: "VLC Community",
        },
        color: 15548997,
      },
    ],
  });
};

module.exports = {
  logsChannelID: logsChannelID,
  perms: perms,
  respond: respond,
  respondAgain: respondAgain,
  log: log,
  warn: warn,
  error: error,
};

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds } = require('./index');

const logsChannel = client.channels.fetch('1057066261164593292');

const perms = async function (user) {
    let comm = await client.guilds.fetch('829792672935575623');
    let commMember = await comm.members.fetch(user.id);
    if (user.id == '218065068875579393' || commMember.roles.cache.has('860576761287934013')) return 0;
    else if (commMember.roles.cache.has('829792673090502764')) return 1;
    else if (commMember.roles.cache.has('829792673090502763')) return 2;
    else return 3;
}

const respond = async function (interaction, success, description) {
  let color = 15548997;
  if (success) {
    color = 5763719;
  }

  await interaction.reply({
    embeds: [
      {
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: 'VLC Community',
        },
        color: color,
      },
    ],
    ephemeral: true,
  });
};

const respondAgain = async function (interaction, success, description) {
  let color = 15548997;
  if (success) {
    color = 5763719;
  }

  await interaction.followUp({
    embeds: [
      {
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: 'VLC Community',
        },
        color: color,
      },
    ],
    ephemeral: true,
  });
};

const warn = async function (description) {
  logsChannel.send({
    embeds: [
      {
        title: '⚠ Warning',
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: 'VLC Community',
        },
        color: 16705372,
      },
    ],
  });
};

const error = async function (description) {
  logsChannel.send({
    embeds: [
      {
        title: '❌ Error',
        description: description,
        footer: {
          iconURL: client.user.displayAvatarURL(),
          text: 'VLC Community',
        },
        color: 15548997,
      },
    ],
  });
};

module.exports = {
  logsChannel: logsChannel,
  perms: perms,
  respond: respond,
  respondAgain: respondAgain,
  warn: warn,
  error: error
};
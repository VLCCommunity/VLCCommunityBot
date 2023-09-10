/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC.
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require("../../index");

module.exports = async function (interaction) {
  interaction.options.getRole("oldrole").members.each((member) => {
    try {
      member.roles.add(interaction.options.getRole("newrole"));
    } catch {
      //
    }
  });

  globals.respond(
    interaction,
    true,
    "Massrole successful.",
    `Added ${interaction.options.getRole(
      "newrole",
    )} to all members with ${interaction.options.getRole("oldrole")}`,
  );
  globals.log(
    interaction.user,
    "/util massrole",
    `Added ${interaction.options.getRole(
      "newrole",
    )} to all members with ${interaction.options.getRole("oldrole")}`,
  );
};

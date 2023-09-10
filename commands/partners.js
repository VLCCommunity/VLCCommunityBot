/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC.
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { client, guilds, globals } = require("../index");

module.exports = async function (interaction) {
  if (true) {
    //await globals.perms(interaction.user) == 0) {
    try {
      let executeSubcommand = require(
        `./partnerssub/${interaction.options.getSubcommand()}`,
      );
      await executeSubcommand(interaction);
    } catch (error) {
      console.log(
        `❌ Unable to execute ${interaction.options.getSubcommand()} partners subcommand. \n` +
          error,
      );
    }
  } else {
    await globals.respond(
      interaction,
      false,
      "❌ Insufficient Permissions",
      "Only the Executive Adminstrator of VLC Community & Partners can execute this command.",
    );
  }
};

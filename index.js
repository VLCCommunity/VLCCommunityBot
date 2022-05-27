/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

const { Client, Intents } = require("discord.js");

const client = new Client({ intents: 98047 });

client.once("ready", async() => {
  console.log("✅ Connected to Discord.");
});

client.on("interactionCreate", async(interaction) => {
  if (interaction.isCommand()) {
    try {
      let executeCommand = require(`./commands/${interaction.commandName}`);
      await executeCommand(interaction);
    } catch (error) {
      console.log(`❌ Unable to execute ${interaction.commandName} command. \n` + error)
    }
  } else if (interaction.isButton()) {
    try {
      let executeButton = require(`./buttons/${interaction.customId}`);
      await executeButton(interaction);
    } catch (error) {
      console.log(`❌ Unable to execute ${interaction.customId} button. \n` + error)
    }
  }
});

client.on("debug", (e) => {
  if (e.substr(6, 3) == "429") { // Discord ban/ratelimit
    exec("kill 1");
  };
});

client.login(process.env["TOKEN"]);
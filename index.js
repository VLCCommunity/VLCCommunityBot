/*---------------------------------------------------------------------------------------------
 *  Copyright (c) VLC Community. All rights reserved.
 *  VLC Community is student-run and not school-sanctioned, and is not in any way affiliated with or endorsed by the VLC. 
 *  The VLC name, logo, and all other branding are property of the Virtual Learning Center.
 *--------------------------------------------------------------------------------------------*/

// Imports and Client Setup

const { Client, Intents } = require("discord.js"); // Discord
const { MongoClient } = require("mongodb"); // Mongo

const client = new Client({ intents: 98047 });
const mongoDB = new MongoClient(process.env["MONGO_URI"], { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB

mongoDB.connect((err) => {
  if (!err) {
    console.log("✅ Connected to MongoDB.");
  } else {
    console.log(`❌ Failed to connect to MongoDB. ${err}`);
  };
});

const botDB = mongoDB.db("BotDB");
const guilds = botDB.collection("Guilds");

client.login(process.env["TOKEN"]);

module.exports = {
  client,
  guilds
}

const globals = require('./globals');
module.exports.globals = globals;

// Discord

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